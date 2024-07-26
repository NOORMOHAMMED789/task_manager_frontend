const getDateFormat = (dateString, inSlashFormat = false) => {
  let output;
  const inputDate = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = inputDate.getDate();
  const month = inputDate.getMonth();
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;

  output = inSlashFormat
    ? `${day}/${month + 1}/${year} ${displayHours}:${minutes
        .toString()
        .padStart(2, "0")} ${amPm}`
    : `${day} ${monthNames[month]} ${year}, ${displayHours}:${minutes
        .toString()
        .padStart(2, "0")} ${amPm}`;
  return output;
};

module.exports = {
    getDateFormat
}