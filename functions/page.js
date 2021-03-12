import { routeList } from "./routes";

export const pageHandler = async (url = String | "") => {
  let filePath = new URL(url);
  if (filePath.search == "") {
    if (filePath.pathname == "/") {
      filePath = "Index";
    } else {
      filePath =
        String(filePath.pathname).slice(1).charAt(0).toUpperCase() +
        String(filePath.pathname).slice(2);

      return await Blog.render(
        document.querySelector("#root"),
        await routeList[filePath]()
      );
    }
  } else {
  }
  // if (query == "") return false;
  // if (!query.match(/\?p=.*/g)) return false;

  // query = encodeURI(query.replace(/\?p=/g, ""));
  // if (query == "") return false;

  // const q = query.split(/\//g);
  // let resultQuery = "";
  // q.forEach((item) => {
  //   resultQuery += String(item).charAt(0).toUpperCase() + String(item).slice(1);
  // });

  // return await Blog.render(
  //   document.querySelector("#root"),
  //   await routeList[resultQuery]()
  // );
};
