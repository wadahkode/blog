import { pageHandler } from "./page.js";
import { desktopLarge, desktopMedium, mobile, tablet } from "./responsive.js";

const breakPoint = {
  extraSmall: [],
  small: [],
  medium: [],
  large: [],
};

document.addEventListener("DOMContentLoaded", () => {
  const resizeWin = new ResizeObserver(main);
  resizeWin.observe(document.body);

  pageHandler(location.search);
});

for (let i = 320; i <= window.screen.width; i++) {
  breakPoint.extraSmall[i] = matchMedia(
    `(min-width: 320px) and (max-width: 640px)`
  );
}

for (let i = 641; i <= window.screen.width; i++) {
  breakPoint.small[i] = matchMedia(`(min-width: 641px) and (max-width: 768px)`);
}

for (let i = 769; i <= window.screen.width; i++) {
  breakPoint.medium[i] = matchMedia(
    `(min-width: 769px) and (max-width: 1366px)`
  );
}

for (let i = 1367; i <= window.screen.width; i++) {
  breakPoint.large[i] = matchMedia(
    `(min-width: 1367px) and (max-width: ${i}px)`
  );
}

function main() {
  const { clientWidth } = document.body;
  if (
    breakPoint.extraSmall[clientWidth] !== undefined &&
    breakPoint.extraSmall[clientWidth].matches
  ) {
    return mobile();
  } else {
    if (
      breakPoint.small[clientWidth] !== undefined &&
      breakPoint.small[clientWidth].matches
    ) {
      return tablet();
    } else if (
      breakPoint.medium[clientWidth] !== undefined &&
      breakPoint.medium[clientWidth].matches
    ) {
      return desktopMedium();
    } else if (
      breakPoint.large[clientWidth] !== undefined &&
      breakPoint.large[clientWidth].matches
    ) {
      return desktopLarge();
    }
  }
}
