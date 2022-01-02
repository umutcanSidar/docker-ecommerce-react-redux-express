export const sortByRating = (value) => {
  switch (value) {
    case "DESC":
      return (a, b) =>
        b.rating > a.rating ? 1 : a.rating == b.rating ? 0 : -1;
    default:
      return;
  }
};