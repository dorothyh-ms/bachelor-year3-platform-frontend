import dayjs, { Dayjs } from 'dayjs';

function formatDate(date: Dayjs) {
  const now = dayjs();
  const diffInMinutes = now.diff(date, 'minute');
  const diffInHours = now.diff(date, 'hour');

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else {
    return date.format("on MMMM D, YYYY");
  }
}

export default formatDate;