/* global kakao */
import "routes/TambangList.css";
import React from "react";
import { dbService } from "fbase";

import { HiUserGroup } from "react-icons/hi"

const { kakao } = window;

const TambangList = (tambangObject) => {
    
    return (
        <div id="home_wrap">
            <div id="notice_word"><div><HiUserGroup size={50} /></div><div>테마 지역 탐방</div></div>
            <div className="notice_contents_wrap"> 준비중입니다. </div>
        </div>

    );
    /*
    return (
        <div id="home_wrap">
            <div id="notice_word"><div><HiUserGroup size={50} /></div><div>탐방모임 리스트</div></div>
            <div className="notice_contents_wrap">
                <div class="map_wrap">
                    <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>

                    <div id="menu_wrap" class="bg_white">
                        <div class="option">
                            <div>
                                <form onsubmit="searchPlaces(); return false;">
                                    키워드 : <input type="text" value="이태원 맛집" id="keyword" size="15" />
                                    <button type="submit">검색하기</button>
                                </form>
                            </div>
                        </div>
                        <hr />
                        <ul id="placesList"></ul>
                        <div id="pagination"></div>
                    </div>
                </div>

            </div>
        </div>

    );*/
}

export default TambangList
