const express = require('express');

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
    Error.captureStackTrace(this, CustomError);
  }
}

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  try {
    throw new CustomError('Este es un error personalizado');
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(500).json({ error: 'Error personalizado: ' + error.message });
    } else {
      res.status(500).json({ error: 'Ocurrió un error: ' + error.message });
    }
  }
});

app.listen(port, () => {
  console.log(`La API está escuchando en el puerto ${port}`);
});
