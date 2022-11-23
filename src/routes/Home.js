import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Moim from "components/Moim";

const Home = ({ userObj }) => {
    const [noticeTitle, setTitle] = useState(""); //공지사항 제목
    const [noticeContents, setContents] = useState(""); //공지사항 내용
    const [moims, setMoims] = useState([]); //모임 리스트

    //모임 리스트를 렌더링 후 한 번 로딩
    useEffect(() => {
        const q = query(collection(dbService, "moim"), orderBy("write_time", "desc")); //q는 쿼리

        //모임 리스트를 스냅샷으로 로딩
        onSnapshot(q, (snapshot) => {
            const moimArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setMoims(moimArr);
        });

    }, []);

    //모임 만들기
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (noticeTitle.length >= 1) { //타이틀 길이가 1이상
                const docRef = await addDoc(collection(dbService, "moim"), {
                    title: noticeTitle,
                    contents: noticeContents,
                    write_time: serverTimestamp(),
                    creatorId: userObj.uid,
                });
                setTitle("");
                console.log("Document written with ID: ", docRef.id);
            } else { console.log("Error : Title block is empty.")}
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;

        /*if(target === noticeTitle){
            setTitle(value);
        } else {
            setContents(value);
        }*/
        
        
    };

    return (
        <div>{
            (userObj.uid === "CAah49juE4Z5PGnheuO6iw2sV012") ? (
            <div><form onSubmit={onSubmit}>
                <input value={noticeTitle} onChange={onChange} type="text" placeholder="공지사항 작성하시오." maxLength={120} />
                <input value={noticeContents} onChange={onChange} type="text" placeholder="내용을 작성하시오." maxLength={120} />
                <input type="submit" value="작성" />
            </form><div>소모임 공지사항</div></div>) : (<div>소모임 공지사항</div>)
            }
            <div>
                {moims.map((moimOb) => (
                    <Moim key={moimOb.id} moimObject={moimOb} isOwner={moimOb.creatorId === userObj.uid} />
                ))}
            </div>
        </div>);
};

export default Home;