import express from 'express';
import admin, { auth, FirebaseError } from 'firebase-admin';
import firebaseJson from './firebase-admin.json';
//@ts-ignore
import cookieparser from 'cookieparser';
import { FIREBASE_ERROR_MESSAGES } from '../utils';

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

  if (req.url.includes('send-reset-password-link')) {
    return next();
  } else if (!req.headers.cookie) {
    return throwError();
  }

  const parsed = cookieparser.parse(req.headers.cookie);
  const firebaseUser = parsed?.firebaseUser;

  if (!firebaseUser || JSON.parse(firebaseUser).role !== 'admin') {
    throwError();
  } else {
    next();
  }
});

app.post('/users', async ({ body }, res) => {
  const { email, password, name } = body;
  try {
    const user = await auth().createUser({ email, password, displayName: name });
    res.json(user);
  } catch (e) {
    res.status(500).send({ message: FIREBASE_ERROR_MESSAGES[(e as FirebaseError).code] ?? (e as any).message });
  }
});

app.post('/users/:email/send-reset-password-link', async ({ params: { email } }, res) => {
  try {
    const user = await auth().getUserByEmail(email);
    const link = await auth().generatePasswordResetLink(email, { url: process.env.APP_URL! });
    res.send({ link, name: user.displayName });
  } catch (e: any) {
    res.status(500).send({ message: FIREBASE_ERROR_MESSAGES[(e as FirebaseError).code] ?? e.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await auth().deleteUser(req.params.id);
  } catch {}
  res.send({ deleted: true });
});

export default app;
