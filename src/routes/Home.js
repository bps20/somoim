import { dbService } from "fbase";
import { addDoc, collection, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [moim, setMoim] = useState("");
    const [moims, setMoims] = useState([]);

    const getMoims = async () => {
        const getmoims = await getDocs(collection(dbService, "moim"));
        getmoims.forEach((document) => {
            const moimObject = {
                ...document.data(),
                id: document.id,
            }
            setMoims((prev) => [document.data(), ...prev]);
        });
    }

    useEffect(() => {
        getMoims();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "moim"), {
                leader: moim,
                write_time: serverTimestamp(),
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
                        <h4>{moimOb.leader}</h4>
                    </div>
                ))}
            </div>
        </div>);
};

export default Home;