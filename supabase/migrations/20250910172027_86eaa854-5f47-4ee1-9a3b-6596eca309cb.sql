-- Seed data for e-commerce platform

-- Insert Categories
INSERT INTO public.categories (name, slug, description, image_url, is_active) VALUES
('Electronics', 'electronics', 'Latest smartphones, laptops, audio devices and more', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop', true),
('Fashion', 'fashion', 'Trendy clothing and accessories for men and women', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', true),
('Home & Kitchen', 'home-kitchen', 'Essential items for your home and kitchen', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', true),
('Beauty & Personal Care', 'beauty', 'Skincare, makeup and personal care products', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop', true),
('Sports & Outdoors', 'sports', 'Sports equipment and outdoor gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', true),
('Books', 'books', 'Wide collection of books across genres', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', true);

-- Insert Subcategories
INSERT INTO public.subcategories (category_id, name, slug, description, is_active) VALUES
-- Electronics subcategories
((SELECT id FROM public.categories WHERE slug = 'electronics'), 'Smartphones', 'smartphones', 'Latest mobile phones and accessories', true),
((SELECT id FROM public.categories WHERE slug = 'electronics'), 'Laptops', 'laptops', 'Laptops for work, gaming, and personal use', true),
((SELECT id FROM public.categories WHERE slug = 'electronics'), 'Audio', 'audio', 'Headphones, earbuds, speakers and audio equipment', true),
((SELECT id FROM public.categories WHERE slug = 'electronics'), 'Tablets', 'tablets', 'Tablets and e-readers', true),
((SELECT id FROM public.categories WHERE slug = 'electronics'), 'Wearables', 'wearables', 'Smartwatches and fitness trackers', true),

-- Fashion subcategories  
((SELECT id FROM public.categories WHERE slug = 'fashion'), 'Men''s Clothing', 'mens-clothing', 'Clothing and accessories for men', true),
((SELECT id FROM public.categories WHERE slug = 'fashion'), 'Women''s Clothing', 'womens-clothing', 'Clothing and accessories for women', true),
((SELECT id FROM public.categories WHERE slug = 'fashion'), 'Footwear', 'footwear', 'Shoes and sandals for all occasions', true),
((SELECT id FROM public.categories WHERE slug = 'fashion'), 'Accessories', 'accessories', 'Bags, watches, jewelry and more', true),

-- Home & Kitchen subcategories
((SELECT id FROM public.categories WHERE slug = 'home-kitchen'), 'Kitchen Appliances', 'kitchen-appliances', 'Essential kitchen appliances and gadgets', true),
((SELECT id FROM public.categories WHERE slug = 'home-kitchen'), 'Home Decor', 'home-decor', 'Decorative items for your home', true),
((SELECT id FROM public.categories WHERE slug = 'home-kitchen'), 'Furniture', 'furniture', 'Furniture for every room', true),
((SELECT id FROM public.categories WHERE slug = 'home-kitchen'), 'Storage', 'storage', 'Storage and organization solutions', true),

-- Beauty subcategories
((SELECT id FROM public.categories WHERE slug = 'beauty'), 'Skincare', 'skincare', 'Face and body skincare products', true),
((SELECT id FROM public.categories WHERE slug = 'beauty'), 'Makeup', 'makeup', 'Cosmetics and beauty tools', true),
((SELECT id FROM public.categories WHERE slug = 'beauty'), 'Fragrances', 'fragrances', 'Perfumes and body sprays', true),
((SELECT id FROM public.categories WHERE slug = 'beauty'), 'Personal Care', 'personal-care', 'Personal hygiene and care products', true),

-- Sports subcategories
((SELECT id FROM public.categories WHERE slug = 'sports'), 'Fitness Equipment', 'fitness-equipment', 'Equipment for home and gym workouts', true),
((SELECT id FROM public.categories WHERE slug = 'sports'), 'Outdoor Gear', 'outdoor-gear', 'Equipment for outdoor activities', true),
((SELECT id FROM public.categories WHERE slug = 'sports'), 'Sports Apparel', 'sports-apparel', 'Athletic clothing and gear', true),

-- Books subcategories
((SELECT id FROM public.categories WHERE slug = 'books'), 'Fiction', 'fiction', 'Novels and fiction books', true),
((SELECT id FROM public.categories WHERE slug = 'books'), 'Non-Fiction', 'non-fiction', 'Educational and informational books', true),
((SELECT id FROM public.categories WHERE slug = 'books'), 'Children''s Books', 'childrens-books', 'Books for children and young adults', true);

-- Insert sample products (smartphones)
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Apple iPhone 15 Pro Max (256GB) - Natural Titanium',
  'The most advanced iPhone ever with titanium design, A17 Pro chip, and pro camera system.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'smartphones'),
  'Apple',
  134900.00,
  159900.00,
  'INR',
  50,
  true,
  true,
  true,
  4.5,
  2847,
  ARRAY['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop'],
  ARRAY['128GB', '256GB', '512GB', '1TB'],
  ARRAY['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
  ARRAY['6.7-inch Super Retina XDR display', 'A17 Pro chip with 6-core GPU', 'Pro camera system with 48MP Main camera', 'Up to 29 hours video playback', 'Action Button for quick shortcuts', 'USB-C connector'],
  '{"Display": "6.7‑inch Super Retina XDR display", "Capacity": "256GB", "Chip": "A17 Pro chip", "Camera": "Pro camera system (48MP Main, 12MP Ultra Wide, 12MP Telephoto)", "Battery": "Up to 29 hours video playback", "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3", "Operating System": "iOS 17"}'::jsonb,
  ARRAY['iphone', 'apple', 'smartphone', 'mobile', 'phone'],
  'Apple iPhone 15 Pro Max - Latest iPhone with A17 Pro Chip',
  'Buy the latest iPhone 15 Pro Max with titanium design, advanced camera system and A17 Pro chip. Available in multiple colors and storage options.'
),
(
  'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)',
  'Premium Android smartphone with S Pen, 200MP camera, and AI features.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'smartphones'),
  'Samsung',
  124999.00,
  139999.00,
  'INR',
  75,
  true,
  true,
  false,
  4.4,
  1923,
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop'],
  ARRAY['256GB', '512GB', '1TB'],
  ARRAY['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
  ARRAY['6.8-inch Dynamic AMOLED 2X display', 'Snapdragon 8 Gen 3 processor', '200MP main camera with AI zoom', '5000mAh battery with fast charging', 'S Pen included', 'IP68 water resistance'],
  '{"Display": "6.8-inch Dynamic AMOLED 2X", "Processor": "Snapdragon 8 Gen 3", "Camera": "200MP + 50MP + 12MP + 10MP", "Battery": "5000mAh", "Storage": "256GB", "RAM": "12GB"}'::jsonb,
  ARRAY['samsung', 'galaxy', 'smartphone', 'mobile', 'phone', 'android'],
  'Samsung Galaxy S24 Ultra - Premium Android Phone with S Pen',
  'Experience the ultimate Android phone with S24 Ultra. Features 200MP camera, S Pen, and AI-powered features for productivity and creativity.'
),
(
  'OnePlus 12 5G (Flowy Emerald, 256GB)',
  'Flagship OnePlus smartphone with Hasselblad cameras and ultra-fast charging.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'smartphones'),
  'OnePlus',
  64999.00,
  69999.00,
  'INR',
  60,
  true,
  false,
  false,
  4.3,
  892,
  ARRAY['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop'],
  ARRAY['256GB', '512GB'],
  ARRAY['Flowy Emerald', 'Silky Black', 'Rock Black'],
  ARRAY['6.82-inch LTPO AMOLED display', 'Snapdragon 8 Gen 3 chipset', '50MP Hasselblad camera system', '5400mAh battery with 100W charging', 'OxygenOS 14 based on Android 14', 'Alert Slider for quick profile switching'],
  '{"Display": "6.82-inch LTPO AMOLED", "Processor": "Snapdragon 8 Gen 3", "Camera": "50MP + 64MP + 48MP", "Battery": "5400mAh", "Storage": "256GB", "RAM": "12GB"}'::jsonb,
  ARRAY['oneplus', 'smartphone', 'mobile', 'phone', 'android'],
  'OnePlus 12 5G - Flagship Performance with Hasselblad Cameras',
  'Discover OnePlus 12 with flagship performance, Hasselblad camera system, and lightning-fast 100W charging technology.'
);

-- Insert sample laptops
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'MacBook Air M2 (13-inch, 8GB RAM, 256GB SSD) - Midnight',
  'Supercharged by the Apple M2 chip, MacBook Air is incredibly capable and versatile.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'laptops'),
  'Apple',
  109900.00,
  119900.00,
  'INR',
  30,
  true,
  true,
  false,
  4.7,
  1567,
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop'],
  ARRAY['256GB', '512GB', '1TB'],
  ARRAY['Midnight', 'Starlight', 'Space Gray', 'Silver'],
  ARRAY['13.6-inch Liquid Retina display', 'Apple M2 chip with 8-core CPU', '8GB unified memory', '256GB SSD storage', 'Up to 18 hours battery life', '1080p FaceTime HD camera'],
  '{"Display": "13.6-inch Liquid Retina", "Processor": "Apple M2 chip", "Memory": "8GB unified memory", "Storage": "256GB SSD", "Graphics": "8-core GPU", "Battery": "Up to 18 hours"}'::jsonb,
  ARRAY['macbook', 'laptop', 'apple', 'computer', 'm2'],
  'MacBook Air M2 - Ultra-fast and Lightweight Laptop',
  'Experience the power of Apple M2 chip in the redesigned MacBook Air. Perfect for work, creativity, and entertainment.'
),
(
  'Dell XPS 13 Plus (Intel i7, 16GB RAM, 512GB SSD)',
  'Premium ultrabook with cutting-edge design and powerful performance.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'laptops'),
  'Dell',
  149900.00,
  169900.00,
  'INR',
  25,
  true,
  false,
  false,
  4.4,
  654,
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop'],
  ARRAY['512GB', '1TB'],
  ARRAY['Platinum Silver', 'Graphite'],
  ARRAY['13.4-inch InfinityEdge display', '12th Gen Intel Core i7 processor', '16GB LPDDR5 memory', '512GB PCIe SSD', 'Intel Iris Xe graphics', 'Premium build quality'],
  '{"Display": "13.4-inch FHD+ InfinityEdge", "Processor": "Intel Core i7-1260P", "Memory": "16GB LPDDR5", "Storage": "512GB PCIe SSD", "Graphics": "Intel Iris Xe", "Weight": "1.26kg"}'::jsonb,
  ARRAY['dell', 'laptop', 'xps', 'computer', 'intel'],
  'Dell XPS 13 Plus - Premium Ultrabook with Intel i7',
  'Dell XPS 13 Plus combines premium design with powerful Intel i7 performance. Perfect for professionals and creatives.'
);

-- Insert sample audio products
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
  'Industry-leading noise cancellation with premium sound quality and all-day comfort.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'audio'),
  'Sony',
  29990.00,
  34990.00,
  'INR',
  100,
  true,
  true,
  true,
  4.6,
  3245,
  ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'],
  ARRAY['Black', 'Silver'],
  ARRAY['Black', 'Silver'],
  ARRAY['Industry-leading noise cancellation', '30-hour battery life', 'Quick charge: 3 min = 3 hours', 'Multipoint connection', 'Speak-to-chat technology', 'Premium comfort design'],
  '{"Driver": "30mm dynamic drivers", "Frequency Response": "4Hz-40kHz", "Battery Life": "30 hours with ANC", "Charging": "USB-C quick charge", "Weight": "250g", "Connectivity": "Bluetooth 5.2"}'::jsonb,
  ARRAY['headphones', 'sony', 'wireless', 'noise canceling', 'audio'],
  'Sony WH-1000XM5 - Premium Noise Canceling Headphones',
  'Experience superior sound quality with Sony WH-1000XM5 headphones. Industry-leading noise cancellation and 30-hour battery life.'
),
(
  'Apple AirPods Pro (2nd Generation)',
  'Advanced noise cancellation, personalized spatial audio, and long battery life.',
  (SELECT id FROM public.categories WHERE slug = 'electronics'),
  (SELECT id FROM public.subcategories WHERE slug = 'audio'),
  'Apple',
  24900.00,
  26900.00,
  'INR',
  150,
  true,
  true,
  true,
  4.7,
  4567,
  ARRAY['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop'],
  ARRAY['White'],
  ARRAY['White'],
  ARRAY['Advanced Active Noise Cancellation', 'Personalized Spatial Audio', 'Adaptive Transparency mode', 'Up to 6 hours listening time', 'MagSafe charging case', 'Sweat and water resistant'],
  '{"Driver": "Custom high-excursion Apple driver", "Chip": "Apple H2 chip", "Battery": "Up to 6 hours (30 hours with case)", "Charging": "Lightning/MagSafe/Qi wireless", "Water Resistance": "IPX4", "Connectivity": "Bluetooth 5.3"}'::jsonb,
  ARRAY['airpods', 'apple', 'wireless', 'earbuds', 'audio'],
  'Apple AirPods Pro 2nd Gen - Premium Wireless Earbuds',
  'Experience next-level audio with AirPods Pro 2nd generation. Advanced noise cancellation and spatial audio technology.'
);

-- Insert sample fashion products
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Men''s Cotton Casual Shirt - Blue Checkered',
  'Comfortable cotton shirt perfect for casual and semi-formal occasions.',
  (SELECT id FROM public.categories WHERE slug = 'fashion'),
  (SELECT id FROM public.subcategories WHERE slug = 'mens-clothing'),
  'Fashion Hub',
  1299.00,
  1999.00,
  'INR',
  200,
  true,
  false,
  false,
  4.3,
  567,
  ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop'],
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Blue', 'White', 'Gray'],
  ARRAY['100% cotton fabric', 'Regular fit', 'Full sleeves', 'Button closure', 'Machine washable', 'Wrinkle resistant'],
  '{"Material": "100% Cotton", "Fit": "Regular", "Sleeve": "Full Sleeve", "Pattern": "Checkered", "Care": "Machine Wash", "Collar": "Spread Collar"}'::jsonb,
  ARRAY['shirt', 'men', 'cotton', 'casual', 'blue', 'checkered'],
  'Men''s Cotton Casual Shirt - Comfortable & Stylish',
  'Premium cotton casual shirt for men. Perfect blend of comfort and style for everyday wear.'
),
(
  'Women''s Floral Print Maxi Dress',
  'Elegant floral maxi dress perfect for parties and special occasions.',
  (SELECT id FROM public.categories WHERE slug = 'fashion'),
  (SELECT id FROM public.subcategories WHERE slug = 'womens-clothing'),
  'Style Studio',
  2499.00,
  3499.00,
  'INR',
  150,
  true,
  true,
  false,
  4.4,
  789,
  ARRAY['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Floral Blue', 'Floral Pink', 'Floral Green'],
  ARRAY['Floral print design', 'Maxi length', 'Sleeveless', 'V-neck', 'Flowy fabric', 'Side zip closure'],
  '{"Material": "Polyester blend", "Length": "Maxi", "Neckline": "V-neck", "Sleeve": "Sleeveless", "Pattern": "Floral", "Occasion": "Party/Casual"}'::jsonb,
  ARRAY['dress', 'women', 'maxi', 'floral', 'party', 'elegant'],
  'Women''s Floral Maxi Dress - Elegant & Comfortable',
  'Beautiful floral print maxi dress for women. Perfect for parties, dates, and special occasions.'
);

-- Insert sample home & kitchen products
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Stainless Steel Cookware Set (5 Pieces)',
  'Premium stainless steel cookware set for all your cooking needs.',
  (SELECT id FROM public.categories WHERE slug = 'home-kitchen'),
  (SELECT id FROM public.subcategories WHERE slug = 'kitchen-appliances'),
  'KitchenPro',
  4999.00,
  6999.00,
  'INR',
  80,
  true,
  true,
  false,
  4.5,
  1234,
  ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop'],
  ARRAY['5-Piece Set', '7-Piece Set', '10-Piece Set'],
  ARRAY['Silver', 'Black'],
  ARRAY['Food-grade stainless steel', 'Heat-resistant handles', 'Induction compatible', 'Dishwasher safe', 'Even heat distribution', '5-year warranty'],
  '{"Material": "Stainless Steel", "Pieces": "5 (Saucepan, Frying Pan, Stockpot, Lids)", "Compatibility": "Gas, Electric, Induction", "Care": "Dishwasher Safe", "Warranty": "5 Years"}'::jsonb,
  ARRAY['cookware', 'kitchen', 'stainless steel', 'pots', 'pans'],
  'Premium Stainless Steel Cookware Set - Kitchen Essentials',
  'Complete your kitchen with this premium stainless steel cookware set. Durable, versatile, and perfect for all cooking methods.'
);

-- Insert sample beauty products  
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Vitamin C Face Serum with Hyaluronic Acid',
  'Brightening face serum with Vitamin C and Hyaluronic Acid for radiant skin.',
  (SELECT id FROM public.categories WHERE slug = 'beauty'),
  (SELECT id FROM public.subcategories WHERE slug = 'skincare'),
  'GlowSkin',
  899.00,
  1299.00,
  'INR',
  300,
  true,
  true,
  true,
  4.6,
  2145,
  ARRAY['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop'],
  ARRAY['30ml', '50ml'],
  ARRAY['Clear'],
  ARRAY['20% Vitamin C', 'Hyaluronic Acid', 'Anti-aging formula', 'Brightens skin tone', 'Reduces dark spots', 'Paraben-free'],
  '{"Volume": "30ml", "Key Ingredients": "Vitamin C, Hyaluronic Acid, Niacinamide", "Skin Type": "All skin types", "Usage": "Morning routine", "Benefits": "Brightening, Anti-aging"}'::jsonb,
  ARRAY['serum', 'vitamin c', 'skincare', 'anti-aging', 'brightening'],
  'Vitamin C Face Serum - Radiant & Youthful Skin',
  'Transform your skin with our Vitamin C serum. Reduces dark spots, brightens complexion, and provides anti-aging benefits.'
);

-- Insert sample sports products
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'Adjustable Dumbbell Set (2.5kg to 24kg)',
  'Space-saving adjustable dumbbells for complete home workout.',
  (SELECT id FROM public.categories WHERE slug = 'sports'),
  (SELECT id FROM public.subcategories WHERE slug = 'fitness-equipment'),
  'FitnessPro',
  12999.00,
  15999.00,
  'INR',
  50,
  true,
  true,
  false,
  4.4,
  876,
  ARRAY['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'],
  ARRAY['2.5kg-24kg', '5kg-40kg'],
  ARRAY['Black', 'Gray'],
  ARRAY['Adjustable weight system', 'Space-saving design', 'Quick weight change', 'Anti-slip grip', 'Durable construction', 'Suitable for all fitness levels'],
  '{"Weight Range": "2.5kg to 24kg per dumbbell", "Material": "Cast iron with rubber coating", "Grip": "Ergonomic handle", "Adjustment": "Quick dial system", "Warranty": "2 years"}'::jsonb,
  ARRAY['dumbbells', 'fitness', 'home gym', 'weights', 'adjustable'],
  'Adjustable Dumbbell Set - Complete Home Gym Solution',
  'Build strength at home with our adjustable dumbbell set. Multiple weight options in one compact design.'
);

-- Insert sample books
INSERT INTO public.products (
  title, description, category_id, subcategory_id, brand, price, original_price, 
  currency, stock_quantity, is_active, is_featured, is_bestseller, rating, review_count,
  images, variants, colors, features, specifications, tags, meta_title, meta_description
) VALUES 
(
  'The Psychology of Money - Morgan Housel',
  'Timeless lessons about wealth, greed, and happiness from one of the greatest financial minds.',
  (SELECT id FROM public.categories WHERE slug = 'books'),
  (SELECT id FROM public.subcategories WHERE slug = 'non-fiction'),
  'Jaico Books',
  299.00,
  399.00,
  'INR',
  500,
  true,
  true,
  true,
  4.8,
  3456,
  ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop'],
  ARRAY['Paperback', 'Hardcover', 'Kindle Edition'],
  ARRAY['Standard'],
  ARRAY['Bestselling finance book', 'Easy to understand concepts', 'Real-world examples', 'Practical money lessons', 'Psychological insights', 'Personal finance wisdom'],
  '{"Author": "Morgan Housel", "Pages": "256", "Language": "English", "Publisher": "Jaico Books", "ISBN": "9788194824978", "Format": "Paperback"}'::jsonb,
  ARRAY['finance', 'psychology', 'money', 'investment', 'personal finance'],
  'The Psychology of Money by Morgan Housel - Financial Wisdom',
  'Discover the psychology behind money decisions. Essential reading for anyone looking to build wealth and understand financial behavior.'
),
(
  'Atomic Habits - James Clear',
  'The life-changing million copy bestseller on building good habits and breaking bad ones.',
  (SELECT id FROM public.categories WHERE slug = 'books'),
  (SELECT id FROM public.subcategories WHERE slug = 'non-fiction'),
  'Random House',
  450.00,
  599.00,
  'INR',
  400,
  true,
  true,
  true,
  4.7,
  5432,
  ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop'],
  ARRAY['Paperback', 'Hardcover', 'Audiobook'],
  ARRAY['Standard'],
  ARRAY['Million copy bestseller', 'Practical habit strategies', 'Science-backed methods', 'Easy to implement', 'Personal development', 'Behavioral change guide'],
  '{"Author": "James Clear", "Pages": "320", "Language": "English", "Publisher": "Random House", "ISBN": "9781847941831", "Format": "Paperback"}'::jsonb,
  ARRAY['habits', 'self-help', 'productivity', 'personal development', 'behavior'],
  'Atomic Habits by James Clear - Build Better Habits',
  'Transform your life with tiny changes. Learn the science of habit formation and behavior change from bestselling author James Clear.'
);