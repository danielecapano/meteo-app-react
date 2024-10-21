const getMyTimezone = () => {
  const date = new Date();
  const timezone = date.getTimezoneOffset() * 60;
  return timezone;
};

export const getDate = (unixTimeStamp, timezone, long = false) => {
  const date = new Date((unixTimeStamp + timezone + getMyTimezone()) * 1000);

  const options = {
    month: long ? "long" : "2-digit",
    day: "numeric",
  };

  return date.toLocaleDateString("it-IT", options);
};
export const getTime = (unixTimeStamp, timezone) => {
  const date = new Date((unixTimeStamp + timezone + getMyTimezone()) * 1000);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString("it-IT", options);
};
