import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";

export const imageUploadToFirebase = async (file) => {
  const fileName = new Date().getTime() + file.name;

  const storage = getStorage(app);

  const storageRef = ref(storage, fileName);

  const uploadTask = await uploadBytes(storageRef, file);

  const url = await getDownloadURL(uploadTask.ref);

  return url;
};

export default async function uploadImages(images) {
  const imagePromises = Array.from(images, (image) =>
    imageUploadToFirebase(image)
  );

  const imageRes = await Promise.all(imagePromises);

  return imageRes; 
}
