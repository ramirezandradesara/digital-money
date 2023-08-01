export const checkExpDate = (date: any) => {
  const todayDate = new Date();
  const todayMonth = todayDate.getMonth() + 1;
  const todayYear = todayDate.getFullYear();
  const mounthCard = parseInt(date.slice(0, 2));
  const yearCard = parseInt(date.slice(3));

  if (yearCard < todayYear) return true;
  if (yearCard === todayYear) {
    if (mounthCard < todayMonth) {
      return true;
    }
  }
  return false;
};