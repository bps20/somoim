/* global kakao */
import "components/Map.css";
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { renderToString } from "react-dom/server"

const { kakao } = window;

const Map = ({ userObj }) => {
    let map;
    const initMapLat = 36.35133, initMapLng = 127.734086;

    const [newMarker, setNewMarker] = useState(""); //새마커 추가
    const [mapMarkers, setMapMarkers] = useState([]); //맵마커 리스트
    const [cover, setCover] = useState(false); //지도 갱신용 state

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
        createMarkers(mapMarkers, markerImage);
        setTimeout(() => mapAppeal(), 1000);
    }, [cover]);




    /*맵에 마커를 뿌린다*/
    function createMarkers(markerInfo, markerImage) {
        console.log(markerInfo);
        for (var i = 0; i < markerInfo.length; i++) {
            const PinLatLng = new kakao.maps.LatLng(markerInfo[i].Lat, markerInfo[i].Lng);

            var marker = new kakao.maps.Marker({
                map: map,
                position: PinLatLng,
                image: markerImage
            });
            //marker.setMap(map); //마커표시

            var overlay = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                content: null,
                position: marker.getPosition(),
                xAnchor: 0,
                yAnchor: 2
            });

            const conBase = (
                <div class="info">
                    <div class="title">{markerInfo[i].title}</div>
                    <div class="body">
                        <div class="img"><img src={markerInfo[i].img} width="73" height="70" /></div>
                    </div>
                    <div class="desc">
                        <div class="t_date">{markerInfo[i].t_date}</div>
                        <div class="t_title">{markerInfo[i].t_title}</div>
                        <div class="members">
                            <div class="t_leader">{markerInfo[i].t_leaderID}</div>
                            <div class="t_member">{markerInfo[i].t_memberID}</div>
                        </div>
                        <div>
                            <a href={markerInfo[i].link} targer="_blank" class="link">탐방후기(카페링크)</a>
                        </div>
                    </div>
                </div>)

            var content = document.createElement("div");
            content.className = "wrap";
            const stringElement = renderToString(conBase);
            content.innerHTML = stringElement;

            console.log(stringElement);
            console.log(content);

            var closeBtn = document.createElement("div");
            closeBtn.className = "close";
            closeBtn.onclick = closeOverlay(overlay);

            content.appendChild(closeBtn);
            overlay.setContent(content);

            overlay.setMap(null);
            kakao.maps.event.addListener(marker, 'click', clickListener(map, overlay));
        }
    }
    function clickListener(map, overlay) {
        return function () {
            overlay.setMap(map);
        };
    }
    function closeOverlay(overlay) {
        return function () {
            overlay.setMap(null);
        };
    }

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
                console.log("Document written with ID: ", docRef.id);
            } else { console.log("Error : Title block is empty.") }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onChange = (event) => {
        const { target: { value },
        } = event;
        setNewMarker(value);
    };

    function mapAppeal() {
        setCover(true);
    }

    return (
        <div>
            { (userObj.uid === "CAah49juE4Z5PGnheuO6iw2sV012") ? (<><form onSubmit={onSubmit}>
                <input value={newMarker} onChange={onChange} type="text" placeholder="장소 이름" maxLength={20} />
                <input value={newMarker} onChange={onChange} type="text" placeholder="좌표Lat" maxLength={20} />
                <input value={newMarker} onChange={onChange} type="text" placeholder="좌표Lng" maxLength={20} />
                <input value={newMarker} onChange={onChange} type="text" placeholder="리더ID" maxLength={20} />
                <input type="submit" value="추가" />
            </form><div class="mapTitle">탐방 지도</div></>) : (<div class="mapTitle">탐방 지도</div>)}
            <div id="map" style={{ width: "700px", height: "900px" }}></div>
            <button onClick={mapAppeal}>지도 위에 표시하기</button>
        </div>
    );
};

export default Map; 