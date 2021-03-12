const root = document.querySelector("#root");

export const admin = async function () {
  root.innerHTML = await Blog.request("admin");
};
