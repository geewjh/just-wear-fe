import { uploadToS3API, addClothesAPI, getAllClothesAPI } from "./closet-api";

export async function uploadToS3Service(imageFormData) {
  const arrOfImageURL = await uploadToS3API(imageFormData);
  const firstImageURL = arrOfImageURL[0];
  return firstImageURL;
}

export async function addClothesService(clothesData) {
  const clothesItem = await addClothesAPI(clothesData);
  return clothesItem;
}

export async function getAllClothesService(clothesData) {
  const allClothesItem = await getAllClothesAPI(clothesData);
  return allClothesItem;
}
