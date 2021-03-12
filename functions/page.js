import { routeList } from "./routes";

export const pageHandler = async (query = String | "") => {
  if (query == "") return false;
  if (!query.match(/\?p=.*/g)) return false;

  query = encodeURI(query.replace(/\?p=/g, ""));
  if (query == "") return false;

  return Blog.render(document.querySelector("#root"), await routeList[query]());
};
