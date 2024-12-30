import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);



function formatSeconds(seconds: number) {
    const time = dayjs.duration(seconds, "seconds");
    const hours = time.hours();
    const minutes = time.minutes();

    if (hours > 0) {
        return `${hours} hours ${minutes} minutes`;
    }
    return `${minutes} minutes`;
}

export default formatSeconds;