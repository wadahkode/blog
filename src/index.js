import path from "path-browserify";

const loader = function (filename) {
  return path.join("./pages", filename + ".html");
};

export const request = async function (name) {
  return require(`./${loader(name)}`).default;
};
