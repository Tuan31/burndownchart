export function formatDate(date) {
  if (date) {
    const newDate = new Date(date);
    return (
      `${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`
    );
  }
  return '-';
}

export function formatMonth(date) {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}`;
  }
  return '-';
}

export function formatYear(date) {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear() + 543}`;
  }
  return '-';
}

