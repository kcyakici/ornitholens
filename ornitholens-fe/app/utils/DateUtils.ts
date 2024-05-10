export function parseDateForum(dateString: string) {
  const dateObj = new Date(dateString).toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format the date and time
  return dateObj;
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
