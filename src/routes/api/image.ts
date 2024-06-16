import express from 'express';

const image = express.Router();

// image.get("/", (req, res,next) => {
//   res.send('Image route')
//   next()
// })

image.get("/:nomeImagem", (req, res,next) => {
  const nomeImagem = req.params.nomeImagem;
  console.log(nomeImagem);
  next()
})

image.use(express.static('public'));

export default image