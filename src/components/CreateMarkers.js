import React from "react";
import { renderToString } from "react-dom/server";

const { kakao } = window;

/*맵에 마커를 뿌린다*/
const createMarkers = (map, markerInfo, markerImage) => {
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

        var closeBtn = document.createElement("div");
        closeBtn.className = "close";
        closeBtn.onclick = closeOverlay(overlay);

        content.appendChild(closeBtn);
        overlay.setContent(content);

        overlay.setMap(null);
        kakao.maps.event.addListener(marker, 'click', clickListener(map, overlay));
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
}

    export default createMarkers;