import { incrementUsageService } from "../../utilities/closet-service";
import toast from "react-hot-toast";
import { LiaPlusSquareSolid } from "react-icons/lia";

export default function ClothesRow({
  type,
  clothes,
  handleDelete,
  handleIncrementUsage,
}) {
  async function incrementUsage(clothesID) {
    try {
      const updatedClothesItem = await incrementUsageService(clothesID);
      handleIncrementUsage(updatedClothesItem);
      toast.success("Thank you for wearing me");
    } catch (err) {
      console.error("Failed to increment usage:", err);
      toast.error("Failed to increment usage");
    }
  }

  function retrieveObjectKey(imageLink) {
    const [objectKey] = imageLink.split("/").slice(-1);
    return objectKey;
  }
  const typeOfClothes = clothes.filter((item) => item.type === type);

  return (
    <div>
      <header className="text-3xl font-bold text-gray-900 mb-6">{type}</header>
      <div className="flex flex-wrap gap-5 justify-center">
        {typeOfClothes.map((item) => (
          <div
            className="card card-compact h-fit bg-base-100 shadow-xl transition-transform duration-500 hover:scale-105"
            key={item._id}
          >
            <figure>
              <img
                src={item.images}
                alt={item.subType}
                className="h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h5 className="card-title">{item.subType}</h5>
              <p className="text-sm text-gray-600">Material: {item.material}</p>
              <p className="text-sm text-gray-600">Usage: {item.usage}</p>
            </div>
            <div className="absolute bottom-0 right-0 m-2 flex items-center">
              <button
                onClick={() => incrementUsage(item._id)}
                className="text-xl cursor-pointer px-2 py-1"
              >
                <LiaPlusSquareSolid />
              </button>
              <button
                onClick={() =>
                  handleDelete(item._id, retrieveObjectKey(item.images))
                }
                className="text-md cursor-pointer px-2 py-1 rounded"
                style={{ userSelect: "none" }}
              >
                [x]
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
