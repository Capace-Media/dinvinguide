const PrettyDate = (uglyDate: string) => {
  const prettyDate = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(uglyDate));

  return prettyDate;
};

export default PrettyDate;
