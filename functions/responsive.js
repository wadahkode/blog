/**
 * Responsive Web Design
 *
 * Detect screen width for mobile, tablet, desktop
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since version 0.1.0
 */
const classList = document.querySelectorAll("[class]");

export const mobile = async () => {
  return classList.forEach(
    (item) =>
      (item.classList = item.classList
        .toString()
        .replace(/lg-/g, "xs:")
        .replace(/md-/g, "xs:")
        .replace(/sm-/g, "xs:")
        .replace(/xs:/g, "xs-"))
  );
};

export const tablet = async () => {
  return classList.forEach(
    (item) =>
      (item.classList = item.classList
        .toString()
        .replace(/lg-/g, "sm:")
        .replace(/md-/g, "sm:")
        .replace(/xs-/g, "sm:")
        .replace(/sm:/g, "sm-"))
  );
};

export const desktopMedium = async () => {
  return classList.forEach(
    (item) =>
      (item.classList = item.classList
        .toString()
        .replace(/lg-/g, "md:")
        .replace(/sm-/g, "md:")
        .replace(/xs-/g, "md:")
        .replace(/md:/g, "md-"))
  );
};

export const desktopLarge = async () => {
  return classList.forEach(
    (item) =>
      (item.classList = item.classList.toString().replace(/lg:/g, "lg-"))
  );
};
