export default function ClothesRow({ type, clothes }) {
  const typeOfClothes = clothes.filter((item) => item.type === type);

  return (
    <div>
      <header className="text-3xl font-bold text-gray-900 mb-6">{type}</header>
      <div className="flex flex-wrap gap-5 justify-center">
        {typeOfClothes.map((item) => (
          <div
            className="card card-compact bg-base-100 shadow-xl transition-transform duration-500 hover:scale-105"
            style={{ minWidth: "280px" }}
            key={item._id}
          >
            <figure>
              <img
                src={item.images}
                alt={item.name}
                className="h-60 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="text-sm text-gray-600">Material: {item.material}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
