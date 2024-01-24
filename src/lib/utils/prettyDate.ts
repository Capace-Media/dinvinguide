const PrettyDate = (uglyDate: string) => {
  if (uglyDate) {
    const prettyDate = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(uglyDate));

    return prettyDate;
  } else {
    return uglyDate;
  }
};

export default PrettyDate;
