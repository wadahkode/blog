import { routeList } from "./routes";

export const pageHandler = async (query = String | "") => {
  if (query == "") return false;
  if (!query.match(/\?p=.*/g)) return false;

  query = encodeURI(query.replace(/\?p=/g, ""));
  if (query == "") return false;

  const q = query.split(/\//g);
  let resultQuery = "";
  q.forEach((item) => {
    resultQuery += String(item).charAt(0).toUpperCase() + String(item).slice(1);
  });

  return await Blog.render(
    document.querySelector("#root"),
    await routeList[resultQuery]()
  );
};
