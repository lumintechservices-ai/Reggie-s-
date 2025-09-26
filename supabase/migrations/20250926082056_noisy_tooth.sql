/*
  # Initial Database Schema for Reggie's Signature Plates

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text)
      - `description` (text)
      - `long_description` (text)
      - `price` (integer)
      - `image_url` (text)
      - `images` (text array)
      - `ingredients` (text array)
      - `nutritional_facts` (jsonb)
      - `is_gluten_free` (boolean)
      - `is_organic` (boolean)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `reference` (text, unique)
      - `customer_email` (text)
      - `total_amount` (integer)
      - `status` (text)
      - `created_at` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (text, foreign key)
      - `quantity` (integer)
      - `price` (integer)
      - `created_at` (timestamp)

    - `blog_posts`
      - `id` (text, primary key)
      - `title` (text)
      - `author` (text)
      - `date` (text)
      - `image_url` (text)
      - `excerpt` (text)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on products and blog_posts
    - Add policies for order creation and customer order viewing
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  price integer NOT NULL,
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  ingredients text[] DEFAULT '{}',
  nutritional_facts jsonb DEFAULT '{}',
  is_gluten_free boolean DEFAULT false,
  is_organic boolean DEFAULT false,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  total_amount integer NOT NULL,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id text REFERENCES products(id),
  quantity integer NOT NULL,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id text PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  date text NOT NULL,
  image_url text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read)
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Create policies for blog_posts (public read)
CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

-- Create policies for orders (customers can create and view their own)
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers can view their own orders"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Create policies for order_items (linked to orders)
CREATE POLICY "Anyone can create order items"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items
  FOR SELECT
  TO public
  USING (true);

-- Insert real menu data
INSERT INTO products (id, name, description, long_description, price, image_url, images, ingredients, nutritional_facts, is_gluten_free, is_organic, category) VALUES
('chicken-stir-fried-pasta', 'Chicken Stir-Fried Pasta', 'Tender chicken pieces stir-fried with perfectly cooked pasta in our signature sauce.', 'Our Chicken Stir-Fried Pasta combines succulent pieces of seasoned chicken with al dente pasta, stir-fried to perfection in our house special sauce. This dish brings together the best of both worlds - the comfort of pasta with the bold flavors of Nigerian stir-fry cooking techniques.', 5000, '/images/dishes/WhatsApp Image 2025-09-26 at 8.52.46 AM.jpeg', ARRAY['/images/dishes/WhatsApp Image 2025-09-26 at 8.52.46 AM.jpeg'], ARRAY['Pasta', 'Chicken', 'Onions', 'Bell Peppers', 'Garlic', 'Ginger', 'Soy Sauce', 'Vegetable Oil'], '{"Calories": "680", "Protein": "35g", "Fat": "28g", "Carbs": "65g"}', false, false, 'Pasta Specials'),

('chicken-dodo-stir-fried-pasta', 'Chicken & Dodo Stir-Fried Pasta', 'A delightful fusion of chicken, sweet plantains (dodo), and pasta in a savory stir-fry.', 'Experience the perfect harmony of flavors with our Chicken & Dodo Stir-Fried Pasta. Sweet, caramelized plantains complement tender chicken pieces and pasta, creating a uniquely Nigerian fusion dish that celebrates local ingredients in a contemporary style.', 5500, '/images/dishes/WhatsApp Image 2025-09-26 at 8.52.46 AM (1).jpeg', ARRAY['/images/dishes/WhatsApp Image 2025-09-26 at 8.52.46 AM (1).jpeg'], ARRAY['Pasta', 'Chicken', 'Plantains (Dodo)', 'Onions', 'Bell Peppers', 'Tomatoes', 'Seasoning'], '{"Calories": "720", "Protein": "32g", "Fat": "30g", "Carbs": "78g"}', false, false, 'Pasta Specials'),

('chicken-stir-fried-penne', 'Chicken Stir-Fried Penne Pasta', 'Penne pasta stir-fried with seasoned chicken in our special blend of spices.', 'Our Chicken Stir-Fried Penne features tube-shaped penne pasta that perfectly captures our flavorful sauce, combined with tender chicken pieces. The unique shape of penne allows every bite to be packed with flavor, making this a customer favorite.', 5500, '/images/dishes/WhatsApp Image 2025-09-26 at 8.52.47 AM.jpeg', ARRAY['/images/dishes/WhatsApp Image 2025-09-26 at 8.52.47 AM.jpeg'], ARRAY['Penne Pasta', 'Chicken', 'Tomato Sauce', 'Onions', 'Garlic', 'Bell Peppers', 'Nigerian Spices'], '{"Calories": "690", "Protein": "34g", "Fat": "26g", "Carbs": "68g"}', false, false, 'Pasta Specials'),

('chicken-dodo-stir-fried-penne', 'Chicken & Dodo Stir-Fried Penne Pasta', 'Penne pasta with chicken and sweet plantains in a rich, flavorful sauce.', 'This elevated version of our penne pasta includes the beloved Nigerian plantains (dodo), adding natural sweetness that balances the savory chicken and spices. The penne tubes hold the sauce beautifully, ensuring every forkful is a perfect combination of flavors.', 6000, 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Penne Pasta', 'Chicken', 'Plantains (Dodo)', 'Tomato Sauce', 'Onions', 'Bell Peppers', 'Garlic', 'Nigerian Spices'], '{"Calories": "750", "Protein": "36g", "Fat": "32g", "Carbs": "82g"}', false, false, 'Pasta Specials'),

('chicken-beef-stir-fried-pasta', 'Chicken & Beef Stir-Fried Pasta', 'A protein-packed pasta dish with both chicken and beef in our signature stir-fry sauce.', 'For the ultimate protein lovers, our Chicken & Beef Stir-Fried Pasta combines the best of both meats. Tender chicken and succulent beef pieces are stir-fried with pasta in our signature sauce, creating a hearty and satisfying meal that will keep you energized.', 6500, 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Pasta', 'Chicken', 'Beef', 'Onions', 'Bell Peppers', 'Tomatoes', 'Garlic', 'Ginger', 'Nigerian Spices'], '{"Calories": "820", "Protein": "45g", "Fat": "38g", "Carbs": "65g"}', false, false, 'Pasta Specials'),

('chicken-beef-dodo-sausage-pasta', 'Chicken & Beef Stir-Fried Pasta with Dodo & Sausage', 'Our ultimate pasta dish loaded with chicken, beef, plantains, and sausage.', 'This is our signature premium pasta dish - a feast that includes tender chicken, succulent beef, sweet plantains (dodo), and flavorful sausage all stir-fried together with pasta. It''s a complete meal that showcases the best of Nigerian flavors in one incredible dish.', 7500, 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Pasta', 'Chicken', 'Beef', 'Plantains (Dodo)', 'Sausage', 'Onions', 'Bell Peppers', 'Tomatoes', 'Nigerian Spices'], '{"Calories": "950", "Protein": "52g", "Fat": "45g", "Carbs": "85g"}', false, false, 'Pasta Specials'),

('chicken-beef-stir-fried-penne', 'Chicken & Beef Stir-Fried Penne Pasta', 'Penne pasta with both chicken and beef in a rich, savory sauce.', 'Our Chicken & Beef Stir-Fried Penne offers the perfect combination of two premium proteins with the sauce-holding power of penne pasta. Each tube captures the rich flavors of our stir-fry sauce, making every bite a delicious experience.', 6500, 'https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Penne Pasta', 'Chicken', 'Beef', 'Tomato Sauce', 'Onions', 'Bell Peppers', 'Garlic', 'Nigerian Spices'], '{"Calories": "800", "Protein": "42g", "Fat": "35g", "Carbs": "68g"}', false, false, 'Pasta Specials'),

('chicken-beef-dodo-sausage-penne', 'Chicken & Beef Stir-Fried Penne Pasta with Dodo & Sausage', 'Our premium penne pasta loaded with chicken, beef, plantains, and sausage.', 'The ultimate indulgence - our premium penne pasta dish featuring chicken, beef, sweet plantains (dodo), and sausage. The penne tubes perfectly capture all the rich flavors and sauces, making this our most popular premium offering.', 7500, 'https://images.pexels.com/photos/2703468/pexels-photo-2703468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/2703468/pexels-photo-2703468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Penne Pasta', 'Chicken', 'Beef', 'Plantains (Dodo)', 'Sausage', 'Tomato Sauce', 'Onions', 'Bell Peppers', 'Nigerian Spices'], '{"Calories": "920", "Protein": "48g", "Fat": "42g", "Carbs": "82g"}', false, false, 'Pasta Specials'),

('jollof-rice-chicken', 'Jollof Rice & Chicken', 'The classic Nigerian favorite - perfectly spiced Jollof rice served with tender chicken.', 'Our signature Jollof Rice is cooked to perfection with the right blend of tomatoes, peppers, and spices that give it that authentic Nigerian taste. Served with succulent, well-seasoned chicken, this dish represents the heart of Nigerian cuisine.', 3500, 'https://images.pexels.com/photos/14602193/pexels-photo-14602193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/14602193/pexels-photo-14602193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Tomatoes', 'Peppers', 'Onions', 'Garlic', 'Ginger', 'Nigerian Spices', 'Stock'], '{"Calories": "650", "Protein": "35g", "Fat": "25g", "Carbs": "75g"}', false, false, 'Rice Specials'),

('jollof-rice-chicken-dodo', 'Jollof Rice & Chicken with Dodo', 'Classic Jollof rice with chicken, enhanced with sweet fried plantains.', 'Take your Jollof rice experience to the next level with our perfectly fried plantains (dodo). The natural sweetness of the plantains complements the savory Jollof rice and tender chicken, creating a well-balanced and satisfying meal.', 4000, 'https://images.pexels.com/photos/6419732/pexels-photo-6419732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/6419732/pexels-photo-6419732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Plantains (Dodo)', 'Tomatoes', 'Peppers', 'Onions', 'Nigerian Spices', 'Palm Oil'], '{"Calories": "720", "Protein": "32g", "Fat": "28g", "Carbs": "88g"}', false, false, 'Rice Specials'),

('rice-stew-chicken', 'Rice & Stew with Chicken', 'Fluffy white rice served with our rich, flavorful Nigerian stew and chicken.', 'Sometimes simplicity is perfection. Our fluffy white rice paired with rich, tomato-based Nigerian stew and tender chicken pieces offers comfort food at its finest. The stew is slow-cooked to develop deep, complex flavors that make this a timeless favorite.', 3800, 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Tomatoes', 'Peppers', 'Onions', 'Garlic', 'Palm Oil', 'Nigerian Spices'], '{"Calories": "620", "Protein": "30g", "Fat": "22g", "Carbs": "78g"}', false, false, 'Rice Specials'),

('rice-palm-oil-sauce-chicken', 'Rice & Palm Oil Sauce with Chicken', 'Traditional rice dish with authentic palm oil sauce and chicken.', 'Experience authentic Nigerian flavors with our Rice & Palm Oil Sauce. The rich, golden palm oil creates a distinctive sauce that''s both nutritious and delicious, served with perfectly cooked rice and tender chicken pieces.', 4500, 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Palm Oil', 'Onions', 'Peppers', 'Garlic', 'Nigerian Spices', 'Stock'], '{"Calories": "680", "Protein": "28g", "Fat": "32g", "Carbs": "72g"}', false, false, 'Rice Specials'),

('rice-stew-chicken-dodo', 'Rice & Stew with Chicken & Dodo', 'White rice with stew, chicken, and sweet fried plantains for the complete experience.', 'Our most complete rice dish combines fluffy white rice, rich Nigerian stew, tender chicken, and sweet fried plantains (dodo). This combination offers a perfect balance of flavors and textures that represents the best of Nigerian home cooking.', 4800, 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Plantains (Dodo)', 'Tomatoes', 'Peppers', 'Onions', 'Palm Oil', 'Nigerian Spices'], '{"Calories": "750", "Protein": "35g", "Fat": "30g", "Carbs": "85g"}', false, false, 'Rice Specials'),

('rice-palm-oil-sauce-chicken-dodo', 'Rice & Palm Oil Sauce with Chicken & Dodo', 'Traditional palm oil rice with chicken and plantains for an authentic experience.', 'The ultimate traditional Nigerian meal - rice with rich palm oil sauce, tender chicken, and sweet fried plantains. This dish celebrates the authentic flavors of Nigerian cuisine and offers a truly satisfying dining experience.', 5000, 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Rice', 'Chicken', 'Plantains (Dodo)', 'Palm Oil', 'Onions', 'Peppers', 'Garlic', 'Nigerian Spices'], '{"Calories": "780", "Protein": "32g", "Fat": "35g", "Carbs": "82g"}', false, false, 'Rice Specials'),

('fried-dodo-egg-sauce', 'Fried Dodo with Egg Sauce', 'Sweet fried plantains served with our signature egg sauce - a local favorite.', 'A beloved Nigerian comfort food combination - perfectly fried sweet plantains (dodo) served with our rich, flavorful egg sauce. This dish is simple yet satisfying, offering the perfect balance of sweet and savory flavors that Nigerians have loved for generations.', 3000, 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', ARRAY['https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], ARRAY['Plantains (Dodo)', 'Eggs', 'Tomatoes', 'Peppers', 'Onions', 'Palm Oil', 'Seasoning'], '{"Calories": "450", "Protein": "15g", "Fat": "25g", "Carbs": "45g"}', false, true, 'Local Favorites');

-- Insert blog posts
INSERT INTO blog_posts (id, title, author, date, image_url, excerpt, content) VALUES
('the-art-of-making-fresh-pasta', 'The Art of Making Fresh Pasta', 'Reggie Okoro', 'August 18, 2023', 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Discover the simple joys of making pasta from scratch. In this post, we walk you through the traditional methods and share our secret recipe...', '<h2>The Foundation: Flour and Eggs</h2><p>The heart of any great pasta is its ingredients. We believe in simplicity and quality. That''s why our classic recipe uses just two: "00" flour and fresh, free-range eggs. The fine milling of "00" flour creates a silky, tender dough, while the rich yolks of the eggs lend color and flavor.</p><img src="https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta dough" class="my-6 rounded-lg shadow-md" /><h2>Kneading: A Labor of Love</h2><p>Kneading isn''t just a step; it''s a connection to the food. For 10-15 minutes, work the dough until it''s smooth and elastic. This develops the gluten structure, which is crucial for that perfect ''al dente'' bite. Feel the dough transform under your hands – it''s a truly meditative process.</p><h2>Resting and Rolling</h2><p>Patience is a virtue, especially in pasta making. Letting the dough rest for at least 30 minutes allows the gluten to relax, making it easier to roll. Whether you use a traditional ''mattarello'' (rolling pin) or a modern pasta machine, the goal is a thin, even sheet of golden dough, ready to be cut into your favorite shapes.</p><blockquote>"Making pasta by hand is a way to slow down and appreciate the process of creating something beautiful and delicious from simple ingredients."</blockquote>'),

('a-guide-to-perfect-pasta-pairings', 'A Guide to Perfect Pasta Pairings', 'Aisha Bello', 'July 25, 2023', 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Not all sauces are created equal, and neither are pasta shapes. Learn how to pair them like a Nigerian mama for the ultimate dining experience.', '<h2>Light Sauces, Delicate Pasta</h2><p>For thin, delicate pasta shapes like Angel Hair or Capellini, you want a sauce that won''t overwhelm them. Think light tomato sauces, olive oil-based sauces (aglio e olio), or simple pesto. The goal is to coat, not to drown.</p><h2>Hearty Sauces, Robust Shapes</h2><p>Chunky, meaty sauces like a classic Bolognese or a rich ragù need a pasta that can hold its own. Shapes with ridges and hollows, like Rigatoni, Penne, or Shells, are perfect for trapping all that deliciousness. The sauce gets into every nook and cranny, ensuring a flavorful bite every time.</p><img src="https://images.pexels.com/photos/5946813/pexels-photo-5946813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta with sauce" class="my-6 rounded-lg shadow-md" /><h2>Creamy Sauces, Broad Noodles</h2><p>Rich, creamy sauces like Alfredo or Carbonara cling beautifully to long, flat noodles. Fettuccine, Pappardelle, and Tagliatelle provide the perfect surface area for these decadent sauces to adhere to, creating a luxurious mouthfeel.</p>'),

('our-commitment-to-local-ingredients', 'Our Commitment to Local Ingredients', 'Reggie Okoro', 'June 12, 2023', 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'At Reggie''s, "fresh" isn''t just a word – it''s a promise. We partner with local farms in and around Abuja to bring you the best flavors Nigeria has to offer.', '<h2>From Farm to Plate</h2><p>We believe that the best dishes start with the best ingredients. That''s why we''ve built strong relationships with local farmers and producers. Our tomatoes are sourced from farms in Jos, our herbs are grown in local gardens, and our eggs come from free-range chickens right here in the community.</p><img src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fresh vegetables" class="my-6 rounded-lg shadow-md" /><h2>Supporting Our Community</h2><p>Sourcing locally does more than just guarantee freshness; it supports our local economy and reduces our carbon footprint. By choosing Reggie''s, you''re not just enjoying a great meal – you''re supporting a network of local artisans and farmers who are passionate about quality.</p>');