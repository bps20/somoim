import "routes/Home.css";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Notice from "components/Notice";
import timeConvert from "components/Time";
import { AiOutlineNotification } from "react-icons/ai"

const Home = ({ userObj }) => {
    const [noticeTitle, setTitle] = useState(""); //공지사항 제목
    const [noticeContents, setContents] = useState(""); //공지사항 내용
    const [notices, setNotices] = useState([]); //모임 리스트

    //공지사항 리스트를 렌더링 후 한 번 로딩
    useEffect(() => {
        const q = query(collection(dbService, "notice"), orderBy("write_time", "desc")); //q는 쿼리
        //공지사항 리스트를 스냅샷으로 로딩
        onSnapshot(q, (snapshot) => {
            const moimArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setNotices(moimArr);
        });
    }, []);

    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name === "notice_title") {
            setTitle(value);
        } else if (name === "notice_contents") {
            setContents(value);
        }
    };
    //모임 만들기
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (noticeTitle.length >= 1) { //타이틀 길이가 1이상
                const docRef = await addDoc(collection(dbService, "notice"), {
                    title: noticeTitle,
                    contents: noticeContents,
                    write_time: timeConvert(),
                    creatorId: userObj.uid,
                });
                setTitle("");
            } else { console.log("Error : Title block is empty.") }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div>{
            (userObj.uid === "CAah49juE4Z5PGnheuO6iw2sV012") ? (
                <form onSubmit={onSubmit}>
                    <input name="title" required value={noticeTitle} onChange={onChange} type="text" placeholder="공지사항 작성하시오." maxLength={120} />
                    <input name="contents" required value={noticeContents} onChange={onChange} type="text" placeholder="내용을 작성하시오." maxLength={120} />
                    <input type="submit" value="작성" />
                </form>) : (<></>)
        }
        <div class="notice_word">소모임 공지사항<AiOutlineNotification style={{marginLeft:'10px'}}/></div>
            <div>
                {notices.map((noticeOb) => (
                    <Notice key={noticeOb.id} noticeObject={noticeOb} isOwner={noticeOb.creatorId === userObj.uid} />
                ))}
            </div>
        </div>);
};

export default Home;