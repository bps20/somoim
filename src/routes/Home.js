import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [moim, setMoim] = useState(""); //모임 개체의 정보
    const [moims, setMoims] = useState([]); //모임 리스트

    //모임 리스트를 렌더링 후 한 번 로딩
    useEffect(() => {
        //q는 쿼리
        const q = query(collection(dbService, "moim"), orderBy("write_time","desc"));

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
            const docRef = await addDoc(collection(dbService, "moim"), {
                title : moim,
                leader: (moim + "의 리더"),
                write_time: serverTimestamp(),
                creatorId : userObj.uid,
            });
            setMoim("");
            console.log("Document written with ID: ", docRef.id);
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
                <input value={moim} onChange={onChange} type="text" placeholder="어떤 모임을 개설하실건가요?" maxLength={120} />
                <input type="submit" value="개설" />
            </form>
            <div>
                {moims.map((moimOb) => (
                    <div key={moimOb.id}>
                        <h4>{moimOb.title}</h4>
                        <h5>{moimOb.leader}</h5>
                    </div>
                ))}
            </div>
        </div>);
};

export default Home;