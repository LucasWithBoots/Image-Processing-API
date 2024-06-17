import express from "express";
import {
  processarImagem,
  mostrarImagem,
  sharpParametros,
} from "../../image-processing";

const image = express.Router();

image.get("/", async (req, res) => {
  const { fileName, width, height } = req.query;

  if (!fileName) {
    throw new Error("Nome de arquivo é necessário!");
  }

  if (!width) {
    throw new Error("Largura é necessário!");
  }

  if (!height) {
    throw new Error("Altura é necessário!");
  }

  const sharpParams: sharpParametros = {
    fileName: fileName.toString(),
    width: +width,
    height: +height,
    inputBuffer: `./images/full/${fileName}`,
    outputBuffer: `./images/thumb/${fileName}`,
  };

  await processarImagem(sharpParams, res);

  await mostrarImagem(sharpParams, res);
});

export default image;
