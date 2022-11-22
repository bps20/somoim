import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, getDocs, query } from "firebase/firestore";

const MapDB = async () => {

    const [mapPins, setMapPins] = useState([]); //맵핀 리스트
    const q = query(collection(dbService, "map"));

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const MapPinArr = 
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.log(error);
    }

}

export default MapDB