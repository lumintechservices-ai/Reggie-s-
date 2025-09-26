import type { Product, BlogPost, Testimonial, FAQ, Review } from './types';

export const REVIEWS: Review[] = [
    { id: 1, author: 'Amina S.', date: '2023-08-15', rating: 5, comment: 'Absolutely delicious! The best Jollof Spaghetti I have ever had in Abuja.' },
    { id: 2, author: 'David O.', date: '2023-08-12', rating: 4, comment: 'Great flavor and very fresh ingredients. Will order again.' },
    { id: 3, author: 'Chioma N.', date: '2023-08-10', rating: 5, comment: 'The gluten-free option is fantastic! Tastes so good.' },
    { id: 4, author: 'Femi A.', date: '2023-08-09', rating: 5, comment: 'Quick delivery and the pasta was still hot. Excellent service!' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'smoky-jollof-spaghetti',
    name: 'Smoky Jollof Spaghetti',
    description: 'A Nigerian party classic, reimagined. Spaghetti cooked in a rich, smoky tomato and pepper sauce.',
    longDescription: 'Indulge in the iconic taste of our Smoky Jollof Spaghetti. We use a signature blend of roasted tomatoes, peppers, and onions, slow-cooked to perfection to create a rich, flavorful sauce that clings to every strand of spaghetti. Finished with that authentic "party jollof" smoky flavor, it\'s a comforting and deeply satisfying dish.',
    price: 4500,
    imageUrl: 'https://images.pexels.com/photos/14602193/pexels-photo-14602193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/14602193/pexels-photo-14602193.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6419732/pexels-photo-6419732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    ingredients: ['Spaghetti', 'Tomato & Pepper Sauce', 'Onions', 'Smoked Paprika', 'Signature Spices'],
    nutritionalFacts: { 'Calories': '650', 'Protein': '30g', 'Fat': '35g', 'Carbs': '55g' },
    isGlutenFree: false,
    isOrganic: false,
    reviews: REVIEWS,
  },
  {
    id: 'afang-spinach-penne',
    name: 'Afang & Spinach Penne',
    description: 'A fusion of Italian pasta and Nigerian greens, tossed in a savory Afang and spinach sauce.',
    longDescription: 'Experience a delightful fusion with our Afang & Spinach Penne. We blend the rich, earthy flavors of Afang leaves with fresh spinach to create a unique, savory pesto-style sauce. Tossed with perfectly al dente penne, this dish is a celebration of local flavors in a contemporary style. A taste of tradition with a twist.',
    price: 4200,
    imageUrl: 'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    ingredients: ['Penne', 'Afang Leaves', 'Spinach', 'Crayfish', 'Palm Oil', 'Seasoning'],
    nutritionalFacts: { 'Calories': '550', 'Protein': '18g', 'Fat': '28g', 'Carbs': '58g' },
    isGlutenFree: false,
    isOrganic: true,
    reviews: REVIEWS.slice(0, 2),
  },
  {
    id: 'zobo-glazed-veggie-noodles',
    name: 'Zobo-Glazed Veggie Noodles',
    description: 'A healthy and flavorful mix of spiralized vegetable noodles in a sweet and tangy Zobo glaze.',
    longDescription: 'Our Zobo-Glazed Veggie Noodles are the perfect choice for a light, healthy, and delicious meal. We use a colorful mix of spiralized zucchini and carrot noodles, stir-fried and coated in a unique glaze made from reduced Zobo (hibiscus) drink, ginger, and a hint of spice. It\'s packed with vitamins and flavor, proving that healthy eating can be incredibly tasty.',
    price: 4800,
    imageUrl: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    ingredients: ['Zucchini Noodles', 'Carrot Noodles', 'Zobo Glaze', 'Ginger', 'Chili'],
    nutritionalFacts: { 'Calories': '350', 'Protein': '8g', 'Fat': '15g', 'Carbs': '30g' },
    isGlutenFree: true,
    isOrganic: true,
    reviews: REVIEWS.slice(2, 3),
  },
  {
    id: 'pepper-soup-ramen-bowl',
    name: 'Pepper Soup Ramen Bowl',
    description: 'A bold and spicy ramen bowl inspired by Nigerian Pepper Soup, with tender chicken and fresh toppings.',
    longDescription: 'Awaken your taste buds with our Pepper Soup Ramen Bowl. This bowl features a rich and intensely aromatic broth infused with traditional pepper soup spices, giving it a satisfying kick. We add chewy ramen noodles, tender pieces of chicken, a soft-boiled egg, and an assortment of fresh toppings. It\'s a deeply flavorful and comforting experience in every spoonful.',
    price: 5500,
    imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7257922/pexels-photo-7257922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    ingredients: ['Ramen Noodles', 'Chicken', 'Pepper Soup Spice Broth', 'Egg', 'Scent Leaves', 'Chili'],
    nutritionalFacts: { 'Calories': '750', 'Protein': '35g', 'Fat': '40g', 'Carbs': '60g' },
    isGlutenFree: false,
    isOrganic: false,
    reviews: REVIEWS,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'the-art-of-making-fresh-pasta',
    title: 'The Art of Making Fresh Pasta',
    author: 'Reggie Okoro',
    date: 'August 18, 2023',
    imageUrl: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'Discover the simple joys of making pasta from scratch. In this post, we walk you through the traditional methods and share our secret recipe...',
    content: `
      <h2>The Foundation: Flour and Eggs</h2>
      <p>The heart of any great pasta is its ingredients. We believe in simplicity and quality. That's why our classic recipe uses just two: "00" flour and fresh, free-range eggs. The fine milling of "00" flour creates a silky, tender dough, while the rich yolks of the eggs lend color and flavor.</p>
      
      <img src="https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta dough" class="my-6 rounded-lg shadow-md" />

      <h2>Kneading: A Labor of Love</h2>
      <p>Kneading isn't just a step; it's a connection to the food. For 10-15 minutes, work the dough until it's smooth and elastic. This develops the gluten structure, which is crucial for that perfect 'al dente' bite. Feel the dough transform under your hands – it's a truly meditative process.</p>

      <h2>Resting and Rolling</h2>
      <p>Patience is a virtue, especially in pasta making. Letting the dough rest for at least 30 minutes allows the gluten to relax, making it easier to roll. Whether you use a traditional 'mattarello' (rolling pin) or a modern pasta machine, the goal is a thin, even sheet of golden dough, ready to be cut into your favorite shapes.</p>

      <blockquote>"Making pasta by hand is a way to slow down and appreciate the process of creating something beautiful and delicious from simple ingredients."</blockquote>
    `,
  },
  {
    id: 'a-guide-to-perfect-pasta-pairings',
    title: 'A Guide to Perfect Pasta Pairings',
    author: 'Aisha Bello',
    date: 'July 25, 2023',
    imageUrl: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'Not all sauces are created equal, and neither are pasta shapes. Learn how to pair them like a Nigerian mama for the ultimate dining experience.',
    content: `
      <h2>Light Sauces, Delicate Pasta</h2>
      <p>For thin, delicate pasta shapes like Angel Hair or Capellini, you want a sauce that won't overwhelm them. Think light tomato sauces, olive oil-based sauces (aglio e olio), or simple pesto. The goal is to coat, not to drown.</p>
      
      <h2>Hearty Sauces, Robust Shapes</h2>
      <p>Chunky, meaty sauces like a classic Bolognese or a rich ragù need a pasta that can hold its own. Shapes with ridges and hollows, like Rigatoni, Penne, or Shells, are perfect for trapping all that deliciousness. The sauce gets into every nook and cranny, ensuring a flavorful bite every time.</p>

      <img src="https://images.pexels.com/photos/5946813/pexels-photo-5946813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta with sauce" class="my-6 rounded-lg shadow-md" />

      <h2>Creamy Sauces, Broad Noodles</h2>
      <p>Rich, creamy sauces like Alfredo or Carbonara cling beautifully to long, flat noodles. Fettuccine, Pappardelle, and Tagliatelle provide the perfect surface area for these decadent sauces to adhere to, creating a luxurious mouthfeel.</p>
    `,
  },
  {
    id: 'our-commitment-to-local-ingredients',
    title: 'Our Commitment to Local Ingredients',
    author: 'Reggie Okoro',
    date: 'June 12, 2023',
    imageUrl: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    excerpt: 'At Reggie\'s, "fresh" isn\'t just a word – it\'s a promise. We partner with local farms in and around Abuja to bring you the best flavors Nigeria has to offer.',
    content: `
      <h2>From Farm to Plate</h2>
      <p>We believe that the best dishes start with the best ingredients. That's why we've built strong relationships with local farmers and producers. Our tomatoes are sourced from farms in Jos, our herbs are grown in local gardens, and our eggs come from free-range chickens right here in the community.</p>

      <img src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fresh vegetables" class="my-6 rounded-lg shadow-md" />

      <h2>Supporting Our Community</h2>
      <p>Sourcing locally does more than just guarantee freshness; it supports our local economy and reduces our carbon footprint. By choosing Reggie's, you're not just enjoying a great meal – you're supporting a network of local artisans and farmers who are passionate about quality.</p>
    `,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Reggie's Signature Plates has completely changed our dinner routine. The pasta is always fresh, the flavors are incredible, and the delivery is lightning fast. The Smoky Jollof Spaghetti is to die for!",
    author: 'Chioma Eze',
    role: 'Loyal Customer, Abuja',
    rating: 5,
  },
  {
    id: 2,
    quote: "As someone with a gluten intolerance, finding delicious pasta is a challenge. Their Zobo-Glazed Veggie Noodles are a game-changer. Healthy, flavorful, and so satisfying. Highly recommended!",
    author: 'Samuel Adebayo',
    role: 'Food Blogger',
    rating: 5,
  },
  {
    id: 3,
    quote: 'The quality of ingredients is evident in every bite. You can taste the freshness. It feels like a home-cooked meal made with love, but without any of the work. We are customers for life.',
    author: 'The Bakare Family',
    role: 'Weekly Regulars',
    rating: 5,
  },
];

export const FAQS: FAQ[] = [
    {
        question: "Where are you located?",
        answer: "Our kitchen is located in the heart of Wuse 2, Abuja, Nigeria. While we are primarily a delivery and takeaway service, we can provide our address for large order pickups."
    },
    {
        question: "Do you offer catering services?",
        answer: "Yes, we do! We offer catering for events of all sizes, from small family gatherings to large corporate functions. Please visit our 'Contact Us' page to get in touch for a custom quote."
    },
    {
        question: "What are your delivery hours?",
        answer: "We deliver from 11:00 AM to 9:00 PM, Monday through Saturday. We are closed on Sundays."
    },
    {
        question: "How do you ensure the food arrives fresh and hot?",
        answer: "We use insulated packaging and partner with reliable delivery services to ensure your meal arrives hot, fresh, and ready to eat. Our kitchen-to-door time is optimized for quality."
    },
    {
        question: "Are there vegetarian or vegan options?",
        answer: "Absolutely! Our Afang & Spinach Penne can be made vegan upon request, and our Zobo-Glazed Veggie Noodles are naturally vegan. We are always happy to accommodate dietary needs."
    }
];