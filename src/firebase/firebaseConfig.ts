import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Alert } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyAI_rYwzRJuSc3UtQe2799C',
  authDomain: 'assignment-73ce2.firebaseapp.com',
  projectId: 'assignment-73ce2',
  storageBucket: 'Yassignment-73ce2.firebasestorage.app',
  messagingSenderId: '116609542790',
  appId: '1:116609542790:ios:dba93a212205cf50fbff07',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
