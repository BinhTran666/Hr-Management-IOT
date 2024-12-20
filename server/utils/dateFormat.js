export const dateFormat = (date) => {
    const newDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour format
    };
    return newDate.toLocaleString("en-US", options); // Specify locale (e.g., "en-US")
}