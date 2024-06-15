import { postToS3API, addClothesAPI, getAllClothesAPI } from "./closet-api";

export async function postToS3Service(imageFormData) {
  const arrOfImageURL = await postToS3API(imageFormData);
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
