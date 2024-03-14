import { utilsFirebase } from "../../config/plugins/firebase.plugin";


export class UploadFileService {
  static async uploadToFirebase(path: string, data: any) {
    const imgRef = utilsFirebase.ref(utilsFirebase.storage, path);

    await utilsFirebase.uploadBytes(imgRef, data);

    return await utilsFirebase.getDownloadURL(imgRef)
  }
}
