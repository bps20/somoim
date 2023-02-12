/* global kakao */
import React from "react";
import { dbService } from "fbase";

import { HiUserGroup } from "react-icons/hi"

const { kakao } = window;

const TambangList = (tambangObject) => {
    

    
    return (
        <div className="page_contents_wrap">
            <div className="page_title_word">
                <div><HiUserGroup size={50} /></div>
                <div>맛집 탐방 후기</div>
            </div>
            <div className="notice_contents_wrap"> 준비중입니다. </div>
        </div>

    );
}

export default TambangList
