import express from 'express';

const app = express();

app.use(express.json());

app.get('/getJSON', (req, res) => {
  res.json({ data: 'data1' });
});

export default app;
