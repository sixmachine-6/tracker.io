const server = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

server.listen(process.env.PORT, () => {
  console.log(`server is listening to the port ${process.env.PORT}`);
});
