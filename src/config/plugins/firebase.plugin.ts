import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { envs } from '../enviroments/enviroment';

const firebaseConfig = {
  apiKey: envs.FIREBASE_API_KEY,
  projectId: envs.FIREBASE_PROJECT_ID,
  storageBucket: envs.FIREBASE_STORAGE,
  appId: envs.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export const utilsFirebase = {
  storage: storage,
  ref: ref,
  getStorage: getStorage,
  uploadBytes: uploadBytes,
  getDownloadURL: getDownloadURL,
}