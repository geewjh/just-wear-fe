import { useState } from "react";

export default function ClothesForm() {
  const [clothesData, setClothesData] = useState({
    images: [],
    type: "",
    material: "",
    name: "",
  });

  const handleImageFileInput = (e) => {
    const imageFiles = Array.from(e.target.files); //converts FileList to an arr.
    const preview = [];

    imageFiles.forEach((img) => {
      const imageUrl = URL.createObjectURL(img); //create object URLs for preview.
      preview.push(imageUrl);
    });

    setClothesData({
      ...clothesData,
      images: [...preview],
    });
  };

  return (
    <div className="container mx-auto max-w-md p-8 bg-black shadow-lg">
      <form className="space-y-4 text-white">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
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
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-gray-500 focus:border-gray-500"
          >
            <option>Cotton</option>
            <option>Linen</option>
            <option>Corduroy</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="image">
            Upload Your Clothes
            <small className="block text-gray-300">
              (For multiple files, upload all at once)
            </small>
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
          {clothesData.images.length !== 0 &&
            clothesData.images.map((img, idx) => (
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
