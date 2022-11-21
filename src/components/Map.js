/* global kakao */
import React, { useEffect } from "react";

const { kakao } = window;

const Map = () => {
    let map;
    const initMapLat = 36.35133;
    const initMapLng = 127.734086;

    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new window.kakao.maps.LatLng(initMapLat, initMapLng),
            draggable: false,
            level: 12,
        };

        map = new window.kakao.maps.Map(container, options); //지도 생성

        var markerInfo = [
            {
                title: '맛집 테스트1',
                latlng: new kakao.maps.LatLng(37.54699, 127.09598),
                mark: true
            },
            {
                title: '생태연못',
                latlng: new kakao.maps.LatLng(33.450936, 126.569477),
                mark: true
            }
        ];

        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(64, 69),
            imageOption = { offset: new kakao.maps.Point(27, 69) };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 마커를 생성합니다
        for (var i = 0; i < markerInfo.length; i++) {
            var marker = new kakao.maps.Marker({
                position: markerInfo[i].latlng,
                image: markerImage // 마커이미지 설정 
            });
            marker.setMap(map); //마커표시
        }

        

        var iwContent = '<div style="padding:10px;">맛집 이름</div><br><a href="https://map.kakao.com/link/map/클릭시이렇게보임,33.450701,126.570667" style="padding:5px; color:blue" target="_blank">지도 크게보기</a>',
            iwPosition = new kakao.maps.LatLng(37.54699, 127.09598),
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        var infowindow = new kakao.maps.InfoWindow({
            map: map,
            position: iwPosition,
            content: iwContent,
            removable: iwRemoveable
        });
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);

        //클릭시 인포윈도우 표시.
        kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseover', function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseout', function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
        });

    }, []);

    const onMoveToggleClick = () => map.setDraggable((prev) => !prev); //지도이동 끄기

    return (
        <>
            <div id="map" style={{ width: "700px", height: "900px" }}></div>
            <button onClick={onMoveToggleClick}>이동방지 풀기</button>
        </>
    );
};

export default Map;