const getRelativeTime = (dateString: Date) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  } else if (diffHours > 0) {
    return `${diffHours} jam lalu`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`;
  } else {
    return `${diffSeconds} detik lalu`;
  }
};

export default getRelativeTime;
