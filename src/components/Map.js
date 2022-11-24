/* global kakao */
import "components/Map.css";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";

import createMarkers from "components/CreateMarkers";

const { kakao } = window;

const Map = ({ userObj }) => {
    let map;
    const initMapLat = 36.35133, initMapLng = 127.734086;

    const [newMarker, setNewMarker] = useState(""); //새마커 추가
    const [mapMarkers, setMapMarkers] = useState([]); //맵마커 리스트
    const [RevealMap, setRevealMap] = useState(false); //지도 갱신용 state

    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(initMapLat, initMapLng),
            draggable: true,
            level: 12,
        };

        map = new window.kakao.maps.Map(container, options); //지도 생성
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            imageSize = new kakao.maps.Size(56, 60.375),
            imageOption = { offset: new kakao.maps.Point(27, 69) };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        /*DB연결*/
        const q = query(collection(dbService, "map"));

        //맵핀 리스트를 스냅샷으로 로딩
        onSnapshot(q, (snapshot) => {
            const mapPinArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }))
            setMapMarkers(mapPinArr);
        });

        /*
        async function getData() {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const mapPinArr = querySnapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }))
                setMapMarkers(mapPinArr);
            });
        }
        getData();*/

        //맵마커 생성
        createMarkers(map, mapMarkers, markerImage);
        setTimeout(() => setRevealMap(true), 1000);
    }, [RevealMap]);

    //탐방 만들기 (운영자 전용)
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newMarker.length >= 1) { //타이틀 길이가 1이상
                const docRef = await addDoc(collection(dbService, "map"), {
                    title: newMarker,
                    leader: (newMarker + "의 리더"),
                    creatorId: userObj.uid,
                });
                setNewMarker("");
            } else { console.log("Error") }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;
        setNewMarker(value);
    };

    return (
        <div>
            <div id="map" style={{ width: "90%", height: "85vh", margin: "0px auto"}}></div>
            { (userObj.uid === "CAah49juE4Z5PGnheuO6iw2sV012") ? (<><form onSubmit={onSubmit}>
            </form></>) : (<></>)}
        </div>
    );
};

export default Map; 