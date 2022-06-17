import express from 'express';
import admin, { auth } from 'firebase-admin';
import firebaseJson from './firebase-admin.json';
//@ts-ignore
import cookieparser from 'cookieparser';

!admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(firebaseJson as unknown as string)
  });

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const throwError = () => {
    res.status(403).send({ error: 'Forbidden' });
  };

  if (!req.headers.cookie) {
    return throwError();
  }

  const parsed = cookieparser.parse(req.headers.cookie);
  const firebaseUser = parsed?.firebaseUser;

  if (!firebaseUser || JSON.parse(firebaseUser).role !== 'admin') {
    return throwError();
  } else {
    next();
  }
});

app.get('/users', async (_, res) => {
  const { users } = await auth().listUsers();
  res.json(users);
});

export default app;
