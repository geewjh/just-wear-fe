import { useState, useEffect } from "react";
import {
  getAllClothesService,
  removeClothesService,
} from "../../utilities/closet-service";
import { LiaPlusSquareSolid } from "react-icons/lia";
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
    } catch (err) {
      console.log(err);
    }
  }

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

    console.log("non-duplicated types:", nonDuplicatedTypes);
    return nonDuplicatedTypes;
  }

  const typeOfClothes = getTypeOfClothes(clothes);

  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <header className="flex mx-4 mb-4  justify-between">
        <h1>This is the closet</h1>
        <Link to="/closet/clothes/new">
          <LiaPlusSquareSolid className="text-5xl" />
        </Link>
      </header>
      <main className="flex flex-col">
        {typeOfClothes.map((type, index) => {
          return (
            <ClothesRow
              key={index}
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
