import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getAllClothesService,
  removeClothesService,
} from "../../utilities/closet-service";
import { TbCameraPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import ClothesRow from "../../components/ClothesRow/ClothesRow";

export default function ClosetPage() {
  const [clothes, setClothes] = useState([]);

  useEffect(function () {
    async function fetchClothesData() {
      const allClothes = await getAllClothesService();
      console.log("fetched clothes:", allClothes);
      setClothes(allClothes);
    }
    fetchClothesData();
  }, []);

  async function handleDelete(removingClothesID, objectKey) {
    try {
      await removeClothesService(removingClothesID, objectKey);
      const updatedCloset = clothes.filter(
        (item) => item._id !== removingClothesID
      );
      setClothes(updatedCloset);
      toast.success("Awesome, you just Marie Kondo-ed your closet");
    } catch (err) {
      console.log(err);
    }
  }

  function handleIncrementUsage(updatedClothesItem) {
    const newUpdatedClothes = clothes.map((item) => {
      if (item._id === updatedClothesItem._id) {
        return updatedClothesItem;
      }
      return item;
    });
    setClothes(newUpdatedClothes);
  }

  const typeOrderToBeRendered = ["Upperwear", "Lowerwear"];

  function getTypeOfClothes(clothes) {
    if (clothes.length === 0) {
      return [];
    }

    let nonDuplicatedTypes = [];
    let presentTypes = new Set();

    clothes.forEach((item) => {
      const type = item.type;
      if (presentTypes.has(type) === false) {
        presentTypes.add(type);
        nonDuplicatedTypes.push(type);
      }
    });

    nonDuplicatedTypes.sort((a, b) => {
      return (
        typeOrderToBeRendered.indexOf(a) - typeOrderToBeRendered.indexOf(b)
      );
    });
    return nonDuplicatedTypes;
  }

  const typeOfClothes = getTypeOfClothes(clothes);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <header className="flex mx-4 mb-4 justify-end">
        <Link to="/closet/clothes/new">
          <TbCameraPlus className="text-5xl cursor-pointer px-2 py-1 rounded  hover:text-zinc-400 transition duration-150 ease-in-out" />
        </Link>
      </header>
      <main className="flex flex-col">
        {typeOfClothes.map((type, index) => {
          return (
            <ClothesRow
              key={index}
              handleIncrementUsage={handleIncrementUsage}
              handleDelete={handleDelete}
              type={type}
              clothes={clothes}
            />
          );
        })}
      </main>
    </div>
  );
}
