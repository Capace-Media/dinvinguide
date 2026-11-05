export const scrollToPosts = (id: string) => {
  const element = document.getElementById(`${id}`);
  const offsetTop = element ? element.offsetTop : 0;
  const desiredOffset = offsetTop - 150;
  window.scrollTo({
    top: desiredOffset,
    behavior: "smooth",
  });
};
