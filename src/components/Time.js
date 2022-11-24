import { Timestamp } from "firebase/firestore";

 /*Date형식을 변형하여 출력*/
const TimeConvert = () => {
        const orginTime = new Date(Timestamp.now().seconds * 1000);

        const formattedDate = orginTime.toLocaleDateString("ko-KR");
        const formattedTime = orginTime.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true });
        const newDate = `${formattedDate} ${formattedTime}`;
        return newDate;
}

export default TimeConvert;