import sendRequest from "./send-request";

const apiURL = import.meta.env.VITE_BASE_URL;
const BASE_URL = `${apiURL}/api/closet`;

export function incrementUsageAPI(clothesID) {
  return sendRequest(`${BASE_URL}/increment-usage/${clothesID}`, "PATCH");
}

export function postToS3API(imageFormData) {
  return sendRequest(
    `${BASE_URL}/clothes/upload/new`,
    "POST",
    imageFormData,
    true
  );
}

export function removeClothesAPI(removingClothesID, objectKey) {
  return sendRequest(
    `${BASE_URL}/clothes/delete/${removingClothesID}/${objectKey}`,
    "DELETE"
  );
}

export function addClothesAPI(clothesData) {
  return sendRequest(`${BASE_URL}/clothes/new`, "POST", clothesData);
}

export function getAllClothesAPI() {
  return sendRequest(`${BASE_URL}/get-all`);
}
