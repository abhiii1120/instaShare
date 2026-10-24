import createApp from "./app/app.js";
import connectDB from "./config/db.config.js";

let app = createApp();
let port = 3000;
function createServer() {
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log("server running on port", port);
      });
    })
    .catch((err) => {
      console.log("error while connecting to db", err);
    });
}

createServer();
