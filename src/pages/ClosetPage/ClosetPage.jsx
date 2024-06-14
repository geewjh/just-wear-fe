import { useState, useEffect } from "react";
import { getAllClothesService } from "../../utilities/closet-service";
import { LiaPlusSquareSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import ClothesRow from "../../components/ClothesRow/ClothesRow";

export default function ClosetPage() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothesData = async () => {
      const allClothes = await getAllClothesService();
      console.log(allClothes);
      setClothes(allClothes);
    };
    fetchClothesData();
  }, []);

  const getTypeOfClothes = (clothes) => {
    if (clothes.length === 0) {
      return [];
    }

    let nonDuplicatedTypes = [];
    let seenTypes = new Set();

    clothes.forEach((item) => {
      const type = item.type;
      if (!seenTypes.has(type)) {
        seenTypes.add(type);
        nonDuplicatedTypes.push(type);
      }
    });

    console.log("non-duplicated types:", nonDuplicatedTypes);
    return nonDuplicatedTypes;
  };

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
          return <ClothesRow key={index} type={type} clothes={clothes} />;
        })}
      </main>
    </div>
  );
}
