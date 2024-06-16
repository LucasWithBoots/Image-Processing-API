import express from 'express';
import sharp from 'sharp';
import * as fs from "node:fs";

const image = express.Router();

// image.get("/", (req, res,next) => {
//   res.send('Image route')
//   next()
// })

// http://localhost:3000/api/image/?nomeImagem=palmtunnel.jpg&width=300&height=300

image.get("/", (req, res,next) => {
  const { fileName, width, height } = req.query
  console.log(`${fileName} ${width} ${height}`);

  let inputBuffer = `./public/full/${fileName}`;
  let outputBuffer = `./public/thumb/${fileName}`;

  sharp(inputBuffer)
    .resize(+width, +height)
    .toFile(outputBuffer, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao processar a imagem.');
        return;
      }

      fs.readFile(outputBuffer, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send('Erro ao ler a imagem processada.');
          return;
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(data);
      });
    });
});


export default image