const dateActive = () => {
  const date = new Date();
  const month = `${date.getMonth() + 1}`;
  const today = `${date.getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${date.getDate()}`;
  return today;
};

export default dateActive;
