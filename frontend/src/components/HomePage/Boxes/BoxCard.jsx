import React from "react";

function BoxCard({ title, items, layout }) {
  return (
    <div className="bg-white h-[420px] p-4 flex flex-col shadow-md hover:shadow-lg">
      {/* Heading */}
      <h2 className="text-lg font-bold mb-2 text-[21px]">{title}</h2>

      {/* Single Image Layout */}
      {layout === "single" && (
        <div className="flex-1 flex flex-col justify-between">
          <img
            src={items[0].image}
            alt={items[0].label}
            className="h-[280px] w-full object-cover"
          />
          <a href="/" className="text-blue-500 hover:text-blue-950 mt-1 text-[13px]">
            See all offers
          </a>
        </div>
      )}

      {/* Grid Layout (4 images) */}
      {layout === "grid" && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start h-[140px]">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-[100px] w-full object-cover"
                />
                <p className="text-[12px]">{item.label}</p>
              </div>
            ))}
          </div>
          <a href="/" className="text-blue-500 hover:text-blue-950 mt-2 text-[13px]">
            See all deals
          </a>
        </div>
      )}
    </div>
  );
}

export default BoxCard;