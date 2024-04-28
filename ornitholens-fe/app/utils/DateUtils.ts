export function parseDateForum(dateString: string) {
  const dateObj = new Date(dateString);

  // Extract date components
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();

  // Extract time components
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes().toLocaleString("defalt", {});

  // Format the date and time
  return `${day} ${month}, ${year} ${hour}:${minute}`;
}

export function parseDateBirdCard(dateString: string) {
  const dateObj = new Date(dateString).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the date and time
  return dateObj;
}
