import { incrementUsageService } from "../../utilities/closet-service";
import toast from "react-hot-toast";
import { LiaPlusSquareSolid } from "react-icons/lia";
import { BsEmojiSmile } from "react-icons/bs";
import { GoThumbsup } from "react-icons/go";
import { ImCrying } from "react-icons/im";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function ClothesRow({
  type,
  clothes,
  handleDelete,
  handleIncrementUsage,
}) {
  const [filterSubType, setFilterSubType] = useState("");
  const [usageOrder, setUsageOrder] = useState("Increasing");

  const subTypeOptions = {
    upperwear: [
      "All",
      "Tees",
      "Wife Beaters",
      "Polos",
      "Pullovers",
      "Jackets",
      "Short Sleeve Shirts",
      "Long Sleeve Shirts",
    ],
    lowerwear: ["All", "Pants", "Shorts", "Jeans"],
  };

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

  const filteredAndSortedClothes = useMemo(() => {
    let filtered = clothes.filter((item) => item.type === type);

    if (filterSubType && filterSubType !== "All") {
      filtered = filtered.filter((item) => item.subType === filterSubType);
    }

    if (usageOrder === "Decreasing") {
      filtered.sort((a, b) => b.usage - a.usage);
    } else {
      filtered.sort((a, b) => a.usage - b.usage);
    }

    return filtered;
  }, [clothes, filterSubType, usageOrder, type]);

  return (
    <div>
      <header className="text-2xl font-bold text-gray-900 mt-10 mb-6">
        {type}:
      </header>
      <div className="flex justify-between items-center pb-4">
        <div>
          <label htmlFor="subType">Filter By:</label>
          <select
            id="subType"
            value={filterSubType}
            onChange={(e) => setFilterSubType(e.target.value)}
            className="ml-2"
          >
            {subTypeOptions[type.toLowerCase()].map((subType) => (
              <option key={subType} value={subType === "All" ? "" : subType}>
                {subType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="usageOrder">Usage Order:</label>
          <select
            id="usageOrder"
            value={usageOrder}
            onChange={(e) => setUsageOrder(e.target.value)}
            className="ml-2"
          >
            <option value="Increasing">Increasing</option>
            <option value="Decreasing">Decreasing</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {filteredAndSortedClothes.map((item) => (
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
              <div className="flex items-center text-sm text-gray-700 mb-10">
                <span className="mr-2">Usage:</span>
                {item.usage === 0 ? (
                  <span className="flex items-center text-red-500">
                    Not even once <ImCrying className="ml-2" />
                  </span>
                ) : item.usage === 1 ? (
                  <span className="flex items-center text-blue-500">
                    Once <BsEmojiSmile className="ml-2" />
                  </span>
                ) : (
                  <span className="flex items-center text-green-500">
                    {item.usage} times <GoThumbsup className="ml-2" />
                  </span>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 m-2 flex items-center">
              <button
                onClick={() => incrementUsage(item._id)}
                className="text-xl cursor-pointer px-2 py-1 hover:text-zinc-400 transition duration-150 ease-in-out"
              >
                <LiaPlusSquareSolid />
              </button>
              <Link
                to={`/closet/edit/clothes/${item._id}`}
                className="text-sm cursor-pointer px-2 py-1 rounded hover:text-zinc-400 transition duration-150 ease-in-out mt-1"
              >
                Edit
              </Link>
            </div>
            <div className="absolute top-2 right-2 flex items-center">
              <button
                onClick={() =>
                  handleDelete(item._id, retrieveObjectKey(item.images))
                }
                className="text-md cursor-pointer px-2 py-1 rounded hover:text-zinc-400 transition duration-150 ease-in-out"
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
