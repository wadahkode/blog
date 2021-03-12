const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 4000;
const hostname = "127.0.0.1";

const server = http.createServer(async (req, res) => {
  let filePath = req.url;

  if (req.url != "/") {
    filePath = await loader(filePath);

    if (!fs.existsSync(filePath)) {
      filePath = await loader("./index.html");
      const stream = fs.createReadStream(filePath);
      const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
      };

      const mimeType = contentType[path.extname(String(filePath))];
      stream.on("data", (chunk) => {
        res
          .writeHead(res.statusCode, {
            "Content-Type": mimeType,
          })
          .end(chunk);
      });
      stream.on("error", async (error) => {
        res
          .writeHead(404, {
            "Content-Type": "text/plain",
          })
          .end(error.message);
      });
    } else {
      const stream = fs.createReadStream(filePath);
      const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
      };

      const mimeType = contentType[path.extname(String(filePath))];
      stream.on("data", (chunk) => {
        res
          .writeHead(res.statusCode, {
            "Content-Type": mimeType,
          })
          .end(chunk);
      });
      stream.on("error", async (error) => {
        res
          .writeHead(404, {
            "Content-Type": "text/plain",
          })
          .end(error.message);
      });
    }
  } else {
    if (filePath == "/") {
      filePath = await loader(filePath + "index.html");
    }

    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => {
      res
        .writeHead(200, {
          "Content-Type": "text/html",
        })
        .end(chunk);
    });

    stream.on("error", (error) => {
      res
        .writeHead(404, {
          "Content-Type": "text/plain",
        })
        .end(error.message);
    });
  }
});

const loader = async (filename) => path.join(__dirname, "public/" + filename);

server.listen(port, () =>
  console.log(`Server running on http://${hostname}:${port}`)
);
