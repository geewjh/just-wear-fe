import {
  postToS3API,
  addClothesAPI,
  updateClothesAPI,
  removeClothesAPI,
  getAllClothesAPI,
  incrementUsageAPI,
  getClothesByIdAPI,
} from "./closet-api";

export async function getClothesByIdService(clothesID) {
  const specificClothesItem = await getClothesByIdAPI(clothesID);
  return specificClothesItem;
}

export async function updateClothesService(clothesID, updatedClothesData) {
  const updatedClothesItem = await updateClothesAPI(
    clothesID,
    updatedClothesData
  );
  return updatedClothesItem;
}

export async function incrementUsageService(clothesID) {
  const incrementedClothesItem = await incrementUsageAPI(clothesID);
  return incrementedClothesItem;
}

export async function postToS3Service(imageFormData) {
  const arrOfImageURL = await postToS3API(imageFormData);
  const firstImageURL = arrOfImageURL[0];
  return firstImageURL;
}

export async function removeClothesService(removingClothesID, objectKey) {
  await removeClothesAPI(removingClothesID, objectKey);
}

export async function addClothesService(clothesData) {
  const clothesItem = await addClothesAPI(clothesData);
  return clothesItem;
}

export async function getAllClothesService(clothesData) {
  const allClothesItem = await getAllClothesAPI(clothesData);
  return allClothesItem;
}
