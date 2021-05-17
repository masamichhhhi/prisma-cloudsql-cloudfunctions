import * as functions from 'firebase-functions';
import { PrismaClient } from '../lib/generated/client';

const prisma = new PrismaClient();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info(process.env);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  response.send(allUsers);
});

export const createPosts = functions.https.onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.send('This is not post request');
  }

  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  });

  response.send('This is post request');
});
