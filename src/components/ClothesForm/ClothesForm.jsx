import { useState, useRef } from "react";
import {
  addClothesService,
  uploadToS3Service,
} from "../../utilities/closet-service";

export default function ClothesForm() {
  const [clothesData, setClothesData] = useState({
    name: "",
    type: "",
    material: "",
    images: [],
    preview: [],
  });

  const inputImage = useRef(null);

  const resetClothesForm = () => {
    setClothesData({
      name: "",
      type: "",
      material: "",
      images: [],
      preview: [],
    });
    inputImage.current.value = "";
  };

  const handleChange = (e) => {
    setClothesData({
      ...clothesData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageFileInput = (e) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clothesData.images.length === 0) return;

    const imageFormData = new FormData();
    clothesData.images.forEach((img) => {
      imageFormData.append("images", img);
    });
    console.log("image appended", imageFormData);

    try {
      const imageURL = await uploadToS3Service(imageFormData);
      const clothesItem = await addClothesService({
        ...clothesData,
        images: imageURL,
      });
      console.log(clothesItem);
      resetClothesForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8 bg-black shadow-lg">
      <form
        className="space-y-4 text-white"
        encType="multipart/form-data"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={clothesData.name}
            onChange={handleChange}
            placeholder=""
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 text-sm font-semibold">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={clothesData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="" disabled>
              Select a Type
            </option>
            <option>Upperwear</option>
            <option>Lowerwear</option>
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
            id="material"
            name="material"
            value={clothesData.material}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="" disabled>
              Select a Material
            </option>
            <option>Cotton</option>
            <option>Linen</option>
            <option>Corduroy</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="image">
            Upload Your Clothes
          </label>
          <input
            className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageFileInput}
            multiple
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
