import { parseISO, formatDistanceToNow } from 'date-fns';

type TimeAgoProps = {
  time: string | undefined;
};

const TimeAgo = ({ time }: TimeAgoProps) => {
  let timeAgo;
  // console.log(time);
  if (time) {
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={time}>
      <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
