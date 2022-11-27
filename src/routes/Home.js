import "routes/Home.css";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import NoticeContent from "components/NoticeContent";
import timeConvert from "components/Time";
import { AiFillNotification } from "react-icons/ai"

const Home = ({ userObj }) => {
    const [newNoticeTitle, setNoticeTitle] = useState(""); //공지사항 제목
    const [newNoticeContents, setNoticeContents] = useState(""); //공지사항 내용
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
        if (name === "title") {
            setNoticeTitle(value);
        } else if (name === "contents") {
            setNoticeContents(value);
        }
    };
    //모임 만들기
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newNoticeTitle.length >= 1) { //타이틀 길이가 1이상
                const docRef = await addDoc(collection(dbService, "notice"), {
                    title: newNoticeTitle,
                    contents: newNoticeContents,
                    write_time: timeConvert(),
                    creatorId: userObj.uid,
                });
                setNoticeTitle("");
                setNoticeContents("");
            } else { console.log("Error") }
        } catch (error) {
            console.error("Error : ", error);
        }
    };

    return (
        <div id="home_wrap">
            <div id="notice_word"><div><AiFillNotification size={50}/></div><div>소모임 공지사항</div></div>
            <div className="notice_contents_wrap">
                {notices.map((noticeOb) => (
                    <NoticeContent key={noticeOb.id} noticeObject={noticeOb} isOwner={noticeOb.creatorId === userObj.uid} />
                ))}
            </div>
            {
                (userObj.uid === "CAah49juE4Z5PGnheuO6iw2sV012") ? (
                    <form onSubmit={onSubmit}>
                        <input name="title" required value={newNoticeTitle} onChange={onChange} type="text" placeholder="공지사항 작성하시오." maxLength={120} />
                        <input name="contents" required value={newNoticeContents} onChange={onChange} type="text" placeholder="내용을 작성하시오." maxLength={120} />
                        <input type="submit" value="작성" />
                    </form>) : (<></>)
            }
        </div>);
};

export default Home;