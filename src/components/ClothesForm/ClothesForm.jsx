import { useState } from "react";
import {
  addClothesService,
  postToS3Service,
} from "../../utilities/closet-service";

export default function ClothesForm() {
  const [clothesData, setClothesData] = useState({
    type: "",
    subType: "",
    material: "",
    images: [],
    preview: [],
  });

  const [fileInputKey, setFileInputKey] = useState(Date.now());

  function clearClothesForm() {
    setClothesData({
      type: "",
      subType: "",
      material: "",
      images: [],
      preview: [],
    });
    setFileInputKey(Date.now());
  }

  function handleChange(e) {
    setClothesData({
      ...clothesData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageFileInput(e) {
    const imageFiles = Array.from(e.target.files); //converts FileList to an arr.
    const updatedPreview = [];

    imageFiles.forEach((img) => {
      const imageUrl = URL.createObjectURL(img); //create object URLs for preview.
      updatedPreview.push(imageUrl);
    });

    setClothesData({
      ...clothesData,
      images: [...clothesData.images, ...imageFiles],
      preview: [...clothesData.preview, ...updatedPreview],
    });

    console.log("image uploaded");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (clothesData.images.length === 0) return;

    const imageFormData = new FormData();
    clothesData.images.forEach((img) => {
      imageFormData.append("images", img);
    });
    console.log("image appended", imageFormData);

    try {
      const imageURL = await postToS3Service(imageFormData);
      const clothesItem = await addClothesService({
        ...clothesData,
        images: imageURL,
      });
      console.log(clothesItem);
      clearClothesForm();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto max-w-md p-8 bg-black shadow-lg">
      <form
        className="space-y-4 text-white"
        encType="multipart/form-data"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 text-sm font-semibold">
            Type
          </label>
          <select
            required
            id="type"
            name="type"
            value={clothesData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="" disabled>
              Pick a Type
            </option>
            <option>Upperwear</option>
            <option>Lowerwear</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="subType" className="block mb-2 text-sm font-semibold">
            Sub-Type
          </label>
          <select
            required
            id="subType"
            name="subType"
            value={clothesData.subType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="" disabled>
              Pick a Sub-Type
            </option>
            <option>Shirts</option>
            <option>Pants</option>
            <option>Shorts</option>
            <option>Jeans</option>
            <option>Tees</option>
            <option>Singlets</option>
            <option>Polos</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="material"
            className="block mb-2 text-sm font-semibold"
          >
            Material
          </label>
          <select
            required
            id="material"
            name="material"
            value={clothesData.material}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="" disabled>
              Pick a Material
            </option>
            <option>Cotton</option>
            <option>Linen</option>
            <option>Corduroy</option>
            <option>Denim</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="image">
            Upload Your Clothes
          </label>
          <input
            required
            className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
            id="image"
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={handleImageFileInput}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {clothesData.preview.length !== 0 &&
            clothesData.preview.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Clothes ${idx + 1}`}
                className="w-24 h-24 rounded-lg"
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full text-sm font-medium text-center px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
