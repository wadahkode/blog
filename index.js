/**
 * Fungsi utama untuk menjalankan server
 *
 * @author wadahkode <mvp.dedefilaras@gmail.com>
 * @since 0.0.1
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 4000;
const contentType = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".min.js": "text/javascript",
  ".css": "text/css",
  ".min.css": "text/css",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};
let bodyContent = "",
  stream;

async function main(req, res) {
  let filePath = req.url;
  let mimeType = contentType[String(path.extname(filePath)).toLowerCase()];

  if ((filePath !== "/" || filePath !== "/admin/") && mimeType !== undefined) {
    filePath = loader("public", filePath);
    mimeType = contentType[String(path.extname(filePath)).toLowerCase()];

    // let's stream
    stream = fs.createReadStream(filePath);
    stream.on("ready", () => stream.pipe(res));
    stream.on("data", (chunk) => {
      res
        .writeHead(res.statusCode, {
          "Content-Type": mimeType,
          "Content-Length": Buffer.byteLength(chunk),
        })
        .write(chunk);
    });
    stream.on("error", (err) => {
      if (err.code == "ENOENT") {
        res.writeHead(404, {
          "Content-Type": mimeType,
        });
      }

      console.log(
        "🌏 %s %s %s %s",
        req.method,
        res.statusCode,
        new Date(),
        req.url
      );
    });
    stream.on("close", () => stream.close());
  } else {
    filePath = loader(
      "app/views",
      filePath == "/"
        ? "welcome.html"
        : filePath == "/admin"
        ? "admin/index.html"
        : filePath + ".html"
    );

    if (!fs.existsSync(filePath)) {
      res
        .writeHead(404, {
          "Content-Type":
            contentType[String(path.extname(filePath)).toLowerCase()],
        })
        .end(fs.readFileSync(loader("app/errors", "404.html")));
    } else {
      // let's stream
      stream = fs.createReadStream(filePath);
      stream.on("ready", () => stream.pipe(res));
      stream.on("data", (chunk) => (bodyContent = chunk));
      stream.on("error", (err) => {
        if (err.code == "ENOENT") {
          res.writeHead(404, {
            "Content-Type": mimeType,
          });
        }
        console.log(
          "🌏 %s %s %s %s",
          req.method,
          res.statusCode,
          new Date(),
          req.url
        );
      });
      stream.on("close", () => stream.close());
    }
  }

  filePath = loader("public", "/index.html");

  // let's stream
  stream = fs.createReadStream(filePath);
  stream.on("ready", () => stream.pipe(res));
  stream.on("data", (chunk) => {
    let content = chunk.toString().match(/\{\{[\s\S]+\}\}/i);

    chunk = chunk.toString().replace(content[0], bodyContent);

    res
      .writeHead(res.statusCode, {
        "Content-Type":
          contentType[String(path.extname(filePath)).toLowerCase()],
        "Content-Length": Buffer.byteLength(chunk),
      })
      .write(chunk);

    console.log(
      "🌏 %s %s %s %s",
      req.method,
      res.statusCode,
      new Date(),
      req.url
    );
  });
  stream.on("error", (err) => console.error(err));
  stream.on("close", () => stream.close());
  stream.on("end", () => res.end());
}

function loader(dirname, filename) {
  return path.join(path.resolve(dirname), filename);
}

const app = http.createServer(main);

app.listen(port, () =>
  console.log(`Server running on http://127.0.0.1:${port}`)
);
