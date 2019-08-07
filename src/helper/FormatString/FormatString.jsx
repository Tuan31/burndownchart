export function formatDate(date) {
  if (date) {
    const newDate = new Date(date);
    return (
      `${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1}/${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}/${newDate.getFullYear() + 543}`
    );
  }
  return '-';
}

export function formatDate2(date) {
  if (date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}`;
  }
}
