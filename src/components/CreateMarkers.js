import React from "react";
import { renderToString } from "react-dom/server";

const { kakao } = window;

var selectedMarker = null;

/*맵에 마커를 뿌린다*/
const createMarkers = (map, markerInfo) => {
    for (var i = 0; i < markerInfo.length; i++) {
        const PinLatLng = new kakao.maps.LatLng(markerInfo[i].Lat, markerInfo[i].Lng);

        var imageDefaultSrc = require("img/blueMarker.png"),
            imageOverSrc = require("img/deepblueMarker.png"),
            imageClickSrc = require("img/redMarker.png"),
            imageSize = new kakao.maps.Size(27, 41),
            imageOption = { offset: new kakao.maps.Point(13.5, 41) };
        var defaultImage = new kakao.maps.MarkerImage(imageDefaultSrc, imageSize, imageOption);
        var overImage = new kakao.maps.MarkerImage(imageOverSrc, imageSize, imageOption);
        var clickImage = new kakao.maps.MarkerImage(imageClickSrc, imageSize, imageOption);

        var marker = new kakao.maps.Marker({
            map: map,
            position: PinLatLng,
            image: defaultImage
        });
        //marker.setMap(map); //마커표시

        marker.normalImage = defaultImage;

        kakao.maps.event.addListener(marker, 'mouseover', mouseListener(marker, overImage));
        kakao.maps.event.addListener(marker, 'mouseout', mouseListener(marker, defaultImage));
        kakao.maps.event.addListener(marker, 'click', mouseClickListener(marker, clickImage));


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
        closeBtn.onclick = closeOverlay(marker, overlay);

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
    function closeOverlay(marker, overlay) {
        return function () {
            overlay.setMap(null);
            marker.setImage(defaultImage);
        };
    }

    /*마커 마우스오버*/
    function mouseListener(marker, Image) {
        return function () {
            // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 오버 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== marker) {
                marker.setImage(Image);
            }
        }
    }
    /*마커 클릭*/
    function mouseClickListener(marker, clickImage) {
        return function () {
            // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 클릭 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== marker) {
                // 클릭된 마커 객체가 null이 아니면
                // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);
                // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                marker.setImage(clickImage);
            }
            // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
            selectedMarker = marker;
        }
    }

    
}

export default createMarkers;