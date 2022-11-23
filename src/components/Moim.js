import React from "react";

const Moim = ({ moimObject, isOwner }) => (
    <div>
        <div>{moimObject.title}</div>
        <div>{timeConvert(moimObject)}</div>
        <div>{moimObject.contents}</div>
        {isOwner && (
            <>
                <button>수정</button>
                <button>삭제</button>
            </>
        )}

    </div>
);

/*Date형식을 변형하여 출력*/
function timeConvert(moimObject) {
    const orginTime = moimObject.write_time.toDate();

    const year = orginTime.getFullYear();
    const month = ('0' + (orginTime.getMonth() + 1)).slice(-2);
    const day = ('0' + orginTime.getDate()).slice(-2);
    const hours = ('0' + orginTime.getHours()).slice(-2);
    const minutes = ('0' + orginTime.getMinutes()).slice(-2);
    const timeString = year + '년 ' + month + '월 ' + day + '일 '+hours+':'+minutes;

    return timeString;
}

export default Moim;