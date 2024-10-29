// const getMyTimezone = () => {
//   const date = new Date();
//   const timezone = date.getTimezoneOffset() * 60;
//   return timezone;
// };

export const getDate = (unixTimeStamp, long = false) => {
  const date = new Date(unixTimeStamp);

  const options = {
    month: long ? "long" : "2-digit",
    day: "numeric",
  };

  return date.toLocaleDateString("it-IT", options);
};
export const getTime = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString("it-IT", options);
};

export const getWeekday = (unixTimeStamp, long = false) => {
  const date = new Date(unixTimeStamp);

  const options = {
    weekday: "long",
  };

  return long ? date.toLocaleDateString("it-IT", options) : date.getDay();
};

export const getHour = (unixTimeStamp) => {
  const date = new Date(unixTimeStamp);

  return date.getHours();
};

export const formattedIsoDate = (date) => {
  date = new Date(date);
  date.setMinutes(0, 0, 0);
  const formattedDate =
    date.toLocaleDateString("sv-SE") +
    "T" +
    date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

  return formattedDate;
};

export const getSunTimesForDate = (dateString, getSunTimes) => {
  const date = dateString.split("T")[0];
  return getSunTimes.find((sunTime) => sunTime.time === date);
};

console.log(getDate("2024-10-28T00:45", true));
console.log(getWeekday("2024-10-28T00:45"));
console.log(getTime("2024-10-28T00:45"));
console.log(getHour("2024-10-28T19:45"));

console.log(formattedIsoDate("2024-10-28T00:45"));
