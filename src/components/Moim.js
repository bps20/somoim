import React from "react";

const Moim = ({ moimObject, isOwner }) => (
    <div>
        <h4>{moimObject.title}</h4>
        <h5>{moimObject.leader}</h5>
        {isOwner && (
            <>
                <button>수정</button>
                <button>삭제</button>
            </>
        )}

    </div>
);

export default Moim;