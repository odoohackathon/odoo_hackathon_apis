import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from '../firebase_service.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default firebaseAdmin;