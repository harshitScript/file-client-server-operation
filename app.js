const express = require("express");
const app = express();
const path = require("path");
const { config } = require("dotenv");
const appRoutes = require("./routes/app-routes");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
config();

app.use(express.static(path.join(__dirname, "public"))); //? /user-files/<file-name>
app.use("/public", express.static(path.join(__dirname, "public"))); //? /public/user-files/<file-name>
app.use(appRoutes);
app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log("Error occurred while starting the server.");
  return console.log(`${process.env.PROJECT_NAME} server started.`);
});
