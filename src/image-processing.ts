import sharp from 'sharp'
import fs from "node:fs";

export interface sharpParametros {
  fileName: string;
  width: number;
  height: number;
  inputBuffer: string;
  outputBuffer: string;
}

export const processarImagem = async (params : sharpParametros, res) => {
  try {
    await sharp(params.inputBuffer)
      .resize(params.width, params.height)
      .toFile(params.outputBuffer)

    return null;
  } catch (error) {
    res.status(500).send("Houve um erro no momento de redimensionar a imagem. Por favor, verifique se a imagem existe.");
  }
}

export const mostrarImagem = async (params : sharpParametros, res) => {
  fs.readFile(params.outputBuffer, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Não foi possível mostrar a imagem aqui! Verifique na pasta /images/thumb se ela está lá.');
      return;
    }

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(data);
  });
}
