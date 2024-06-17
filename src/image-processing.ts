import sharp from "sharp";
import fs from "node:fs";
import express, { Request, Response } from "express";

export interface sharpParametros {
  fileName: string;
  width: number;
  height: number;
  inputBuffer: string;
  outputBuffer: string;
}

export const processarImagem = async (
  params: sharpParametros,
  res: Response,
) => {
  try {
    try {
      if (!fs.existsSync("./images/thumb")) {
        fs.mkdirSync("./images/thumb");
      }
    } catch (err) {
      res
        .status(500)
        .send(
          "Não foi possível criar a pasta ./images/thumb. Verifique se o programa possui permissão para essa ação.",
        );
    }

    await sharp(params.inputBuffer)
      .resize(params.width, params.height)
      .toFile(params.outputBuffer);

    return null;
  } catch (error) {
    res
      .status(500)
      .send(
        "Houve um erro no momento de redimensionar a imagem. Por favor, verifique se a imagem existe.",
      );
  }
};

export const mostrarImagem = async (params: sharpParametros, res: Response) => {
  fs.readFile(params.outputBuffer, (err, data) => {
    if (err) {
      res
        .status(500)
        .send(
          "Não foi possível mostrar a imagem aqui! Verifique na pasta /images/thumb se ela está lá.",
        );
      return;
    }

    res.setHeader("Content-Type", "image/jpeg");
    res.send(data);
  });
};
