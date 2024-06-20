import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateClothesService,
  postToS3Service,
  getClothesByIdService,
} from "../../utilities/closet-service";

export default function EditClothesForm() {
  const { clothesID } = useParams();
  const navigate = useNavigate();

  const [clothesData, setClothesData] = useState({
    type: "",
    subType: "",
    material: "",
    usage: 0,
    images: [],
    preview: [],
  });

  const [originalData, setOriginalData] = useState({});
  const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(
    function () {
      async function fetchSpecificClothesData() {
        const specificClothes = await getClothesByIdService(clothesID);
        const initialData = {
          type: specificClothes.type,
          subType: specificClothes.subType,
          material: specificClothes.material,
          usage: specificClothes.usage,
          images: specificClothes.images,
          preview: [specificClothes.images],
        };
        setClothesData(initialData);
        setOriginalData(JSON.parse(JSON.stringify(initialData)));
        setFileInputKey(Date.now());
      }
      fetchSpecificClothesData();
    },
    [clothesID]
  );

  function checkFormChanged() {
    const { type, subType, material, usage, images } = clothesData;
    const imagesChanged = isNewImageUploaded && images !== originalData.images;
    const dataChanged =
      type !== originalData.type ||
      subType !== originalData.subType ||
      material !== originalData.material ||
      Number(usage) !== Number(originalData.usage);

    return dataChanged || imagesChanged;
  }

  function handleDeleteImage() {
    setClothesData((prevClothesData) => ({
      ...prevClothesData,
      images: originalData.images,
      preview: [originalData.images],
    }));

    setIsNewImageUploaded(false);
    setFileInputKey(Date.now());
  }

  function handleChange(e) {
    setClothesData((prevClothesData) => ({
      ...prevClothesData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImageFileInput(e) {
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    const imageUrl = URL.createObjectURL(imageFile);
    setClothesData((prevClothesData) => ({
      ...prevClothesData,
      images: imageFile,
      preview: [imageUrl],
    }));

    setIsNewImageUploaded(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkFormChanged()) {
      toast.error("Can't submit without any changes");
      return;
    }

    let imageURL = clothesData.images;
    if (isNewImageUploaded) {
      const formData = new FormData();
      formData.append("images", clothesData.images);
      imageURL = await postToS3Service(formData);
    }

    const updatedClothesData = {
      ...clothesData,
      images: imageURL,
    };

    try {
      await updateClothesService(clothesID, updatedClothesData);
      toast.success("Clothes updated successfully");
      navigate("/closet");
    } catch (err) {
      console.error("Failed to update clothes:", err);
      toast.error("Failed to update clothes");
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
          <label htmlFor="usage" className="block mb-2 text-sm font-semibold">
            Usage
          </label>
          <input
            required
            type="number"
            id="usage"
            name="usage"
            min="0"
            value={clothesData.usage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="image">
            Edit Your Clothes
          </label>
          <input
            key={fileInputKey}
            className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageFileInput}
          />
          {clothesData.preview.map((img, idx) => (
            <div key={idx} className="mt-2 flex flex-col items-center">
              <img
                src={img}
                alt="Preview"
                className="w-24 h-24 rounded-lg mb-2"
              />
              {isNewImageUploaded && (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Remove Image
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full text-sm font-medium text-center px-6 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
