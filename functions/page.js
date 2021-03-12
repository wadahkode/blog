import { routeList } from "./routes";

export const pageHandler = async (url = String | "") => {
  let controller = "Welcome",
    content = "";

  url = new URL(url);

  if (url.pathname != "/" && url.searchParams.get("q") == null) {
    controller =
      String(url.pathname).slice(1).charAt(0).toUpperCase() +
      String(url.pathname).slice(2);

    if (!routeList.hasOwnProperty(controller)) {
      content += await routeList["Error"].e404();
    } else {
      content += await routeList[controller]();
    }
  } else {
    if (url.pathname == "/" && url.searchParams.get("q") == null) {
      content += await routeList[controller]();
    } else {
      controller = "Search";
      content += await routeList[controller](
        encodeURI(url.searchParams.get("q"))
      );
    }
  }

  return await Blog.render(document.querySelector("#root"), content);
};
