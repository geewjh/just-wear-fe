import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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

  function handleDeleteImage() {
    setClothesData({
      type: "",
      subType: "",
      material: "",
      images: [],
      preview: [],
    });
    setFileInputKey(Date.now());
    toast.success("image removed");
  }

  function handleChange(e) {
    setClothesData({
      ...clothesData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageFileInput(e) {
    const imageFile = e.target.files[0]; // get the single selected file
    if (!imageFile) return;

    const imageUrl = URL.createObjectURL(imageFile); // create object URL for preview

    setClothesData((prevData) => ({
      ...prevData,
      images: [imageFile], // store only the last selected file
      preview: [imageUrl], // show only the last selected image's preview
    }));
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
      toast.success("clothes added");
      clearClothesForm();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container mx-auto max-w-md p-8 bg-black shadow-lg mt-20 relative">
      <button
        type="button"
        onClick={() => navigate("/closet")}
        className="absolute top-2 right-2 text-white font-bold hover:text-zinc-400 transition duration-150 ease-in-out"
      >
        [x]
      </button>
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
            <option>Pants</option>
            <option>Shorts</option>
            <option>Jeans</option>
            <option>Tees</option>
            <option>Wife Beaters</option>
            <option>Polos</option>
            <option>Pullovers</option>
            <option>Jackets</option>
            <option>Short Sleeve Shirts</option>
            <option>Long Sleeve Shirts</option>
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
          {clothesData.images.length > 0 ? (
            <span>
              <button
                type="button"
                onClick={handleDeleteImage}
                className="btn btn-remove rounded bg-gray-800 text-gray-300 border border-gray-600 px-4 py-2 mt-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                [x]
              </button>
            </span>
          ) : (
            <input
              required
              className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
              id="image"
              key={fileInputKey}
              type="file"
              accept="image/*"
              onChange={handleImageFileInput}
            />
          )}
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
