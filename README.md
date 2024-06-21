# JustWear - Wear it or get rid of it.

JustWear is a MERN stack application that acts as a digital copy of your closet. It allows users to monitor their clothing usage patterns. It is inspired by the principles of professional tidying expert, Marie Kondo. By fostering a deeper awareness of your closet, the app encourages you to practice the KonMari method, keeping only the clothes that matters and discarding those that no longer spark joy.

## Features

- **Closet Management:** Create a digital copy of your closet by posting pictures of your clothing, categorise them, keep track of the usage, edit and delete them whenever necessary.
- **Search Functionality:** Users will be able to search for their clothes based on the category.
- **Sort Functionality:** Users will be able to sort their clothes based on the usage order.
- **Filter Functionality:** Users will be able to filter their clothes based on the various sub types of their clothes.
- **Authentication:** Users will be able to sign up for an account, log in, log out and deactivate their account securely.

## Deployment

You may access the deployed version of the app [here](https://main.d2hnmd97ss8ky2.amplifyapp.com) which is hosted on [AWS Amplify](https://aws.amazon.com/amplify/).
The back-end utilises MongoDB, Express and Mongoose for the database and is deployed on [Render](https://render.com/).
Images are created with a unique identifier(UUID) and resized using sharp before uploading to [AWS S3 Bucket](https://aws.amazon.com/s3/) using multer.
You can access the back-end repo [here](https://github.com/geewjh/just-wear-be).

## API

- **Closet Management**:

  - `GET /api/closet/get-all`
  - `GET /api/closet/get/clothes/:clothesID`
  - `DELETE /api/closet/clothes/delete/:removingClothesID/:objectKey`
  - `POST /api/closet/clothes/new`
  - `POST /api/closet/clothes/upload/new`
  - `PATCH /api/closet/increment-usage/:clothesID`
  - `PATCH /api/closet/update-clothes/:clothesID`

- **User**:

  - `GET /api/users/check-token`
  - `POST /api/users`
  - `POST /api/users/login`
  - `POST /api/users/delete`

## Technologies Used

- React with Vite
- Node.js
- Express
- MongoDB
- S3 Bucket
- Tailwind CSS
- DaisyUI

## Future Developments

- **Additional categories:** The app can be expanded to more categories such as shoes, caps, jewellery etc.

- **Cater to female users:** The current available clothing type is catered more towards male users.

- **Clothing suggestions based on mood:** Allow users to have suggestions on what to wear for the day based on how they are feeling.

- **Clothing suggestions based on the weather:** Allows users to have suggestions on what to wear based on the weather for the day.
