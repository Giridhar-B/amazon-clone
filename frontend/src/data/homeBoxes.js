// Row - 1
// Box - 1
import R1B1I1 from "../assets/HomePage/BoxImages/BoxRow1/Box1/Image1.jpg";
import R1B1I2 from "../assets/HomePage/BoxImages/BoxRow1/Box1/Image2.jpg";
import R1B1I3 from "../assets/HomePage/BoxImages/BoxRow1/Box1/Image3.jpg";
import R1B1I4 from "../assets/HomePage/BoxImages/BoxRow1/Box1/Image4.jpg";
// Box 2
import R1B2I1 from "../assets/HomePage/BoxImages/BoxRow1/Box2/Image1.jpg";
// Box 3
import R1B3I1 from "../assets/HomePage/BoxImages/BoxRow1/Box3/Image1.jpg";
import R1B3I2 from "../assets/HomePage/BoxImages/BoxRow1/Box3/Image2.jpg";
import R1B3I3 from "../assets/HomePage/BoxImages/BoxRow1/Box3/Image3.jpg";
import R1B3I4 from "../assets/HomePage/BoxImages/BoxRow1/Box3/Image4.jpg";
// Box 4
import R1B4I1 from "../assets/HomePage/BoxImages/BoxRow1/Box4/Image1.jpg";

// Row - 2
// Box - 1
import R2B1I1 from "../assets/HomePage/BoxImages/BoxRow2/Box1/img1.jpg";
import R2B1I2 from "../assets/HomePage/BoxImages/BoxRow2/Box1/img2.jpg";
import R2B1I3 from "../assets/HomePage/BoxImages/BoxRow2/Box1/img3.jpg";
import R2B1I4 from "../assets/HomePage/BoxImages/BoxRow2/Box1/img4.jpg";
// Box - 2
import R2B2I1 from "../assets/HomePage/BoxImages/BoxRow2/Box2/img1.jpg";
import R2B2I2 from "../assets/HomePage/BoxImages/BoxRow2/Box2/img2.jpg";
import R2B2I3 from "../assets/HomePage/BoxImages/BoxRow2/Box2/img3.jpg";
import R2B2I4 from "../assets/HomePage/BoxImages/BoxRow2/Box2/img4.jpg";
// Box - 3
import R2B3I1 from "../assets/HomePage/BoxImages/BoxRow2/Box3/img1.jpg";
import R2B3I2 from "../assets/HomePage/BoxImages/BoxRow2/Box3/img2.jpg";
import R2B3I3 from "../assets/HomePage/BoxImages/BoxRow2/Box3/img3.jpg";
import R2B3I4 from "../assets/HomePage/BoxImages/BoxRow2/Box3/img4.jpg";
// Box - 4
import R2B4I1 from "../assets/HomePage/BoxImages/BoxRow2/Box4/img1.jpg";
import R2B4I2 from "../assets/HomePage/BoxImages/BoxRow2/Box4/img2.jpg";
import R2B4I3 from "../assets/HomePage/BoxImages/BoxRow2/Box4/img3.jpg";
import R2B4I4 from "../assets/HomePage/BoxImages/BoxRow2/Box4/img4.jpg";

// Row - 3
// Box - 1
import R3B1I1 from "../assets/HomePage/BoxImages/BoxRow3/Box1/img1.jpg";
import R3B1I2 from "../assets/HomePage/BoxImages/BoxRow3/Box1/img2.jpg";
import R3B1I3 from "../assets/HomePage/BoxImages/BoxRow3/Box1/img3.jpg";
import R3B1I4 from "../assets/HomePage/BoxImages/BoxRow3/Box1/img4.jpg";
// Box - 2
import R3B2I1 from "../assets/HomePage/BoxImages/BoxRow3/Box2/img1.jpg";
import R3B2I2 from "../assets/HomePage/BoxImages/BoxRow3/Box2/img2.jpg";
import R3B2I3 from "../assets/HomePage/BoxImages/BoxRow3/Box2/img3.jpg";
import R3B2I4 from "../assets/HomePage/BoxImages/BoxRow3/Box2/img4.jpg";
// Box - 3
import R3B3I1 from "../assets/HomePage/BoxImages/BoxRow3/Box3/img1.jpg";
import R3B3I2 from "../assets/HomePage/BoxImages/BoxRow3/Box3/img2.jpg";
import R3B3I3 from "../assets/HomePage/BoxImages/BoxRow3/Box3/img3.jpg";
import R3B3I4 from "../assets/HomePage/BoxImages/BoxRow3/Box3/img4.jpg";
// Box - 4
import R3B4I1 from "../assets/HomePage/BoxImages/BoxRow3/Box4/img1.jpg";
import R3B4I2 from "../assets/HomePage/BoxImages/BoxRow3/Box4/img2.jpg";
import R3B4I3 from "../assets/HomePage/BoxImages/BoxRow3/Box4/img3.jpg";
import R3B4I4 from "../assets/HomePage/BoxImages/BoxRow3/Box4/img4.jpg";

// Row - 4
// Box - 1
import R4B1I1 from "../assets/HomePage/BoxImages/BoxRow4/Box1/img1.jpg";
import R4B1I2 from "../assets/HomePage/BoxImages/BoxRow4/Box1/img2.jpg";
import R4B1I3 from "../assets/HomePage/BoxImages/BoxRow4/Box1/img3.jpg";
import R4B1I4 from "../assets/HomePage/BoxImages/BoxRow4/Box1/img4.jpg";
// Box - 2
import R4B2I1 from "../assets/HomePage/BoxImages/BoxRow4/Box2/img1.jpg";
// Box - 3
import R4B3I1 from "../assets/HomePage/BoxImages/BoxRow4/Box3/img1.jpg";
// Box - 4
import R4B4I1 from "../assets/HomePage/BoxImages/BoxRow4/Box4/img1.jpg";
import R4B4I2 from "../assets/HomePage/BoxImages/BoxRow4/Box4/img2.jpg";
import R4B4I3 from "../assets/HomePage/BoxImages/BoxRow4/Box4/img3.jpg";
import R4B4I4 from "../assets/HomePage/BoxImages/BoxRow4/Box4/img4.jpg";


export const homeBoxRows = [
  {
    id: "row1",
    overlap: true, // only first row overlaps slider
    boxes: [
      {
        title: "Up to 80% off | Home, kitchen & more",
        layout: "grid",
        items: [
          { image: R1B1I1, label: "Kitchen essentials" },
          { image: R1B1I2, label: "Home decor" },
          { image: R1B1I3, label: "Furniture" },
          { image: R1B1I4, label: "Home improvement" },
        ],
      },
      {
        title: "Up to 80% off | Electronics & Accessories",
        layout: "single",
        items: [{ image: R1B2I1, label: "" }],
      },
      {
        title: "Shop by brand | Deals on top smartphones",
        layout: "grid",
        items: [
          { image: R1B3I1, label: "Saving up to ₹12,000" },
          { image: R1B3I2, label: "Savings up to ₹5,000" },
          { image: R1B3I3, label: "Savings up to ₹4,000" },
          { image: R1B3I4, label: "Savings up to ₹4,000" },
        ],
      },
      {
        title: "Up to 70% off | Truly wireless earbuds , headphones & more",
        layout: "single",
        items: [{ image: R1B4I1, label: "" }],
      },
    ],
  },
  {
    id: "row2",
    overlap: false,
    boxes: [
      {
        title: "Up to 65% off | Offers on home appliances",
        layout: "grid",
        items: [
          { image: R2B1I1, label: "Washing machines" },
          { image: R2B1I2, label: "Refrigerators" },
          { image: R2B1I3, label: "Air conditioners" },
          { image: R2B1I4, label: "Chimneys" },
        ],
      },
      {
        title: "Starting ₹299 | Festive deals | Amazon brands & more",
        layout: "grid",
        items: [
          { image: R2B2I1, label: "Min. 60% off | Home furnishing" },
          { image: R2B2I2, label: "Min. 50% off | Cookware sets" },
          { image: R2B2I3, label: "Min. 40% off | Daily needs" },
          { image: R2B2I4, label: "Min. 60% off | Top-rated styles" },
        ],
      },
      {
        title: "Big Savings on top TV brands | Upto 65% Off",
        layout: "grid",
        items: [
          { image: R2B3I1, label: "Sony TVs | Up to ₹5,000 exchange offers" },
          { image: R2B3I2, label: "Samsung TVs | Up to 12 months No Cost EMI" },
          { image: R2B3I3, label: "LG TVs | Up to 40% off" },
          { image: R2B3I4, label: "Xiaomi TVs | Up to 50% Off" },
        ],
      },
      {
        title: "Up to 70% off | Deals on outdoor toys",
        layout: "grid",
        items: [
          { image: R2B4I1, label: "Starting ₹799 | Scooters" },
          { image: R2B4I2, label: "Starting ₹1,599 | Slides" },
          { image: R2B4I3, label: "Starting ₹599 | Play tents" },
          { image: R2B4I4, label: "Starting ₹3,999 | Electric ride-ons" },
        ],
      },
    ],
  },
    {
    id: "row3",
    overlap: false,
    boxes: [
      {
        title: "Up to 70% off | Trending deals from stores near you",
        layout: "grid",
        items: [
          { image: R3B1I1, label: "Hero" },
          { image: R3B1I2, label: "Bajaj" },
          { image: R3B1I3, label: "Ather | Rizta S 123km" },
          { image: R3B1I4, label: "Chetak | Electric scooter" },
        ],
      },
      {
        title: "Up to 70% off | Collections from Emerging businesses",
        layout: "grid",
        items: [
          { image: R3B2I1, label: "Home decor" },
          { image: R3B2I2, label: "Kitchen essentials" },
          { image: R3B2I3, label: "Beauty products" },
          { image: R3B2I4, label: "Furniture" },
        ],
      },
      {
        title: "Up to 70% Off | Empowering Women-led brands",
        layout: "grid",
        items: [
          { image: R3B3I1, label: "Kitchen storages & more" },
          { image: R3B3I2, label: "Solid furniture" },
          { image: R3B3I3, label: "Women's wear" },
          { image: R3B3I4, label: "Skin care & more" },
        ],
      },
      {
        title: "Up to 80% off | Amazon brands & more",
        layout: "grid",
        items: [
          { image: R3B4I1, label: "Starting ₹299 | Home essentials" },
          { image: R3B4I2, label: "Min. 50% off | Kitchen essentials" },
          { image: R3B4I3, label: "Up to 60% off | Toys & games" },
          { image: R3B4I4, label: "Min. 55% off | Women's ethnicwear" },
        ],
      },
    ],
  },
  {
    id: "row4",
    overlap: false,
    boxes: [
      {
        title: "Up to 70% off | Top categories from Small Businesses",
        layout: "grid",
        items: [
          { image: R4B1I1, label: "Home decor" },
          { image: R4B1I2, label: "Clothing" },
          { image: R4B1I3, label: "Furniture" },
          { image: R4B1I4, label: "Beauty products" },
        ],
      },
      {
        title: "Up to 70% off | Amazon Renewed",
        layout: "single",
        items: [
          { image: R4B2I1, label: "" },
        ],
      },
      {
        title: "Up to 70% off | International brands",
        layout: "single",
        items: [
          { image: R4B3I1, label: "" },
        ],
      },
      {
        title: "Up to 80% off | Treasures from Indian artisans",
        layout: "grid",
        items: [
          { image: R4B4I1, label: "Kitchen essentials & more" },
          { image: R4B4I2, label: "Handcrafted furniture" },
          { image: R4B4I3, label: "Women's wear" },
          { image: R4B4I4, label: "Toddler toys" },
        ],
      },
    ],
  },
];
