import React from "react";
import BoxCard from "./BoxCard";
import ProductCard from "../../Common/ProductCard";   
import { homeBoxRows } from "../../../data/homeBoxes";
import { electronicsDeals } from "../../../data/productCarouselData"; 

function BoxGrid({ rowIds, showProducts = false }) {
  return (
    <div className="relative px-10">
      {/* Render the homepage style "boxes" */}
      {homeBoxRows
        .filter((row) => rowIds.includes(row.id)) // only show selected rows
        .map((row) => (
          <div
            key={row.id}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
              row.overlap ? "-mt-[350px]" : "mt-6" // only first row overlaps slider
            }`}
          >
            {row.boxes.map((box, idx) => (
              <BoxCard
                key={idx}
                title={box.title}
                layout={box.layout}
                items={box.items}
              />
            ))}
          </div>
        ))}

      {/* Render product previews if enabled */}
      {showProducts && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {electronicsDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BoxGrid;
