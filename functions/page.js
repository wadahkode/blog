const root = document.querySelector("#root");

const pages = {
  admin: async function () {
    root.innerHTML = await Blog.request("admin");
  },

  "admin/login": async function () {
    root.innerHTML = "";
  },
};

export const pageHandler = async function (query = String | "") {
  if (query == "") return false;
  if (!query.match(/\?p=.*/g)) return false;

  query = encodeURI(query.replace(/\?p=/g, ""));
  if (query == "") return false;

  return pages[query]();
};
