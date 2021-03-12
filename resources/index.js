import path from "path-browserify";

const loader = function (filename) {
  return path.join("./pages", filename + ".html");
};

const fakeScript = document.createElement("script");

export const createView = async function (name) {
  return require(`./${loader(name)}`).default;
};

export const render = async function (parentNode, childNodes) {
  let match = childNodes.match(/<[script][\s\S]*>/i);
  parentNode.innerHTML = childNodes;
  let s = parentNode.querySelector("script");

  if (s !== null) {
    fakeScript.innerHTML = s.innerHTML;
    parentNode.innerHTML = childNodes.replace(match[0], "");
  }

  const clear = await document.body.insertBefore(
    parentNode,
    document.body.querySelector("script")
  );

  if (clear.innerHTML !== null || clear.innerHTML !== "") {
    document.body.append(fakeScript);
  }
};
