import createApp from "./app/app.js";

let app = createApp();
let port = 3000;
function createServer() {
  app.listen(port, () => {
    console.log("server running on port", port);
  });
}

createServer()