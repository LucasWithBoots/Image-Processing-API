import express from 'express';
import { processarImagem, mostrarImagem, sharpParametros } from '../../image-processing';

const image = express.Router();

image.get("/", async (req, res, next) => {

  const { fileName, width, height } = req.query

  const sharpParams: sharpParametros = {
    fileName: fileName.toString(),
    width: +width,
    height: +height,
    inputBuffer: `./images/full/${fileName}`,
    outputBuffer: `./images/thumb/${fileName}`
  };

  await processarImagem(sharpParams, res);

  await mostrarImagem(sharpParams, res);
});

export default image