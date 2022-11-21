import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Moim from "components/Moim";

const Home = ({ userObj }) => {
    const [moimTitle, setMoim] = useState(""); //모임 개체의 정보
    const [moims, setMoims] = useState([]); //모임 리스트

    //모임 리스트를 렌더링 후 한 번 로딩
    useEffect(() => {
        //q는 쿼리
        const q = query(collection(dbService, "moim"), orderBy("write_time", "desc"));

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
            if (moimTitle.length >= 1) { //타이틀 길이가 1이상
                const docRef = await addDoc(collection(dbService, "moim"), {
                    title: moimTitle,
                    leader: (moimTitle + "의 리더"),
                    write_time: serverTimestamp(),
                    creatorId: userObj.uid,
                });
                setMoim("");
                console.log("Document written with ID: ", docRef.id);
            } else { console.log("Error : Title block is empty.")}
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;
        setMoim(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={moimTitle} onChange={onChange} type="text" placeholder="어떤 모임을 개설하실건가요?" maxLength={120} />
                <input type="submit" value="개설" />
            </form>
            <div>
                {moims.map((moimOb) => (
                    <Moim key={moimOb.id} moimObject={moimOb} isOwner={moimOb.creatorId === userObj.uid} />
                ))}
            </div>
        </div>);
};

export default Home;