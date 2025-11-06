INSERT INTO products (title, description, brand, category, price, original_price, stock, created_at, asin, about_item)
VALUES (
  'Samsung Galaxy S24 Ultra 5G AI Smartphone',
  'Brand: Samsung
Operating System: Android 14
RAM Memory Installed Size: 12 GB
CPU Model: Snapdragon 8 Gen3
CPU Speed: 3.39 GHz
Storage: 256 GB
Color: Titanium Gray
Camera: 200MP with ProVisual Engine
Battery: 5000mAh',
  'Samsung',
  'Electronics',
  74999,
  134999,
  20,
  now(),
  'B0CS5XW6TN',
  ARRAY[
    'Galaxy AI - Welcome to the era of mobile AI, unleashing new levels of creativity and productivity.',
    'Titanium Frame - Ultimate design with titanium exterior and 17.25cm flat display.',
    'Epic Camera - 200MP camera with ProVisual Engine ensures professional-grade photos.',
    'Powerful Processor - Snapdragon 8 Gen 3 with intelligent battery for high performance.',
    'Built-in S Pen and Security - S Pen for productivity and Knox protection for security.'
  ]
);
