import { uploadToS3API, addClothesAPI } from "./closet-api";

export async function uploadToS3Service(imageFormData) {
  const data = await uploadToS3API(imageFormData);
  const imageURL = data.imageURLs[0];
  return imageURL;
}

export async function addClothesService(clothesData) {
  const clothesItem = await addClothesAPI(clothesData);
  return clothesItem;
}
