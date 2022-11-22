/* global kakao */
import React, { useEffect } from "react";
import "components/Map.css";

const { kakao } = window;
function closeOverlay(overlay) {
    return function () {
        overlay.setMap(null);
    };
}
const Map = () => {
    let map;
    const initMapLat = 36.35133, initMapLng = 127.734086;

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

        var markerInfo = [
            {
                content: '<div class="wrap">' +
                            '<div class="info">' +
                                '<div class="title">맛집 제1번</div>' +
                    //          '<div class="close" onclick={closeOverlay(overlay)} title="닫기"></div>' +
                                '<div class="body">' +
                                    '<div class="img">' +
                                        '<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png" width="73" height="70">' +
                                    '</div>' +
                                    '<div class="desc">' +
                                        '<div class="ellipsis">서울특별시 왕십리로 222</div>' +
                                        '<div class="jibun ellipsis">(우) 11111 (지번) 사근동 222</div>' +
                                        '<div><a href="https://www.hanyang.ac.kr" target="_blank" class="link">홈페이지</a></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                latlng: new kakao.maps.LatLng(37.54699, 127.09598),
            },
            {
                content: '<div class="wrap">' +
                    '    <div class="info">' +
                    '        <div class="title">' +
                    '            카카오 스페이스닷원' +
                    //'            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
                    '        </div>' +
                    '        <div class="body">' +
                    '            <div class="img">' +
                    '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
                    '           </div>' +
                    '            <div class="desc">' +
                    '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
                    '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
                    '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
                    '            </div>' +
                    '        </div>' +
                    '    </div>' +
                    '</div>',
                latlng: new kakao.maps.LatLng(35.450936, 126.569477),
            }
        ];

        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            imageSize = new kakao.maps.Size(64, 69),
            imageOption = { offset: new kakao.maps.Point(27, 69) };
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 마커를 생성합니다
        createMarkers(markerInfo, markerImage);

    }, []);

    function createMarkers( markerInfo, markerImage ){
        for (var i = 0; i < markerInfo.length; i++) {
            var marker = new kakao.maps.Marker({
                map: map,
                position: markerInfo[i].latlng,
                image: markerImage
            });
            //marker.setMap(map); //마커표시

            var overlay = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                content: markerInfo[i].content,
                position: marker.getPosition(),
                xAnchor: 0,
                yAnchor: 2
            });

            var content = document.createElement("div");
            content.innerHTML = markerInfo[i].content;

            var closeBtn = document.createElement("button");
            closeBtn.innerHTML = '닫기';
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

    return (
        <>
            <div id="map" style={{ width: "700px", height: "900px" }}></div>
        </>
    );
};

export default Map;