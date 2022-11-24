import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { BsPencilSquare, BsTrash} from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

const Notice = ({ noticeObject, isOwner }) => {

    const noticeObj = doc(dbService, "notice", `${noticeObject.id}`); //공지사항객체
    const [editing, setEditing] = useState(false);
    const [newNoticeTitle, setNewNoticeTitle,] = useState(noticeObject.title);
    const [newNoticeContents, setNewNoticeContents] = useState(noticeObject.contents);

    const onDeleteClick = async () => {
        const ok = window.confirm("이 공지사항을 삭제하시겠습니까?")
        if (ok) {
            await deleteDoc(noticeObj);
        }
    };

    const onModifyClick = async () => {
        if (!editing) {
            setEditing(true);
        } else {
            const ok = window.confirm("수정을 취소하시겠습니까?")
            if (ok) {
                setEditing(false);
            }
        }

    };

    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name === "NoticeTitle") {
            setNewNoticeTitle(value);
        } else if (name === "NoticeContents") {
            setNewNoticeContents(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newNoticeTitle.length >= 1) { //공지사항 내용이 1글자이상
                await updateDoc(noticeObj, { title: newNoticeTitle, contents: newNoticeContents });
                setEditing(false);
            } else { console.log("Error") }
        } catch (error) {
            console.error("Error : ", error);
        }
    };

    return (
        <div class="notice_wrap">
            <div class="notice">
                {editing ? (
                    <form class="modify" onSubmit={onSubmit}>
                        <input class="title" name="NoticeTitle" required value={newNoticeTitle} onChange={onChange} type="text" placeholder={noticeObject.title} />
                        <div class="write_time">{noticeObject.write_time}</div>
                        <input class="contents" name="NoticeContents" required value={newNoticeContents} onChange={onChange} type="text" placeholder={noticeObject.contents} />

                    </form>) : (
                    <>
                        <div class="title">{noticeObject.title}</div>
                        <div class="write_time">{noticeObject.write_time}</div>
                        <div class="contents">{noticeObject.contents}</div>
                    </>)}

                {isOwner && (
                    <div class="buttons">
                        {editing ? (
                            <>
                                <BsPencilSquare onClick={onSubmit}/>
                                <GiCancel onClick={onModifyClick}/>
                            </>
                        ) : (
                            <>
                                <BsPencilSquare onClick={onModifyClick} />
                            </>)}
                        <BsTrash onClick={onDeleteClick}/>

                    </div>
                )}

            </div>
        </div>
    )
};

export default Notice;