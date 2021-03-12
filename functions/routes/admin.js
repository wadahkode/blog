const root = document.querySelector("#root");

export const admin = async function () {
  const view = await Blog.createView("admin");

  return Blog.render(root, view);
};
