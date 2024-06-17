import express from "express";
import image from "./api/image";
import path from "path";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

routes.use("/image", image);

export default routes;
