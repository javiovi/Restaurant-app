import { NextApiRequest, NextApiResponse } from 'next';

const restaurants = [
  {
    id: 1,
    name: "SuperSano",
    products: [
      { id: 1, name: "Organic Quinoa Bowl", price: 180, image: "/images/Images-1.jpg", bowlsAvailable: 20 },
      { id: 2, name: "Grilled Avocado Toast", price: 150 , image: "/images/Images-2.jpg", bowlsAvailable: 10 },
      { id: 3, name: "Kale Caesar Salad", price: 200 , image: "/images/Images-3.jpg", bowlsAvailable: 12 },
      { id: 4, name: "Vegan Mushroom Risotto", price: 240 , image: "/images/Images-4.jpg", bowlsAvailable: 23 },
      { id: 5, name: "Fresh Berry Smoothie", price: 120 , image: "/images/Images-5.jpg", bowlsAvailable: 20 },
      { id: 6, name: "Detox Green Juice", price: 100 , image: "/images/Images-6.jpg", bowlsAvailable: 2 },
      { id: 7, name: "Vegan Lentil Soup", price: 190 , image: "/images/Images-7.jpg", bowlsAvailable: 8},
      { id: 8, name: "Tofu Stir Fry", price: 210 , image: "/images/Images-8.jpg", bowlsAvailable: 17 } ,
      { id: 9, name: "Baked Sweet Potato", price: 140 , image: "/images/Images.jpg", bowlsAvailable: 30 },
    
    ],
  },
  {
    id: 2,
    name: "GourmetLand",
    products: [
      { id: 1, name: "Filet Mignon Steak", price: 520  , image: "/images/Images.jpg", bowlsAvailable: 30 },
      { id: 2, name: "Lobster Bisque", price: 380 , image: "/images/Images-1.jpg", bowlsAvailable: 10 },
      { id: 3, name: "Truffle Mashed Potatoes", price: 250  , image: "/images/Images-2.jpg", bowlsAvailable: 3 },
      { id: 4, name: "Bacon-Wrapped Scallops", price: 45  , image: "/images/Images-3.jpg", bowlsAvailable: 14 },
      { id: 5, name: "Crème Brûlée", price: 300   , image: "/images/Images-4.jpg", bowlsAvailable: 12},
      { id: 6, name: "Pan-Seared Salmon", price: 480  , image: "/images/Images-5.jpg", bowlsAvailable: 50 },
      { id: 7, name: "Duck a l’Orange", price: 520  , image: "/images/Images-6.jpg", bowlsAvailable: 39},
      { id: 8, name: "Stuffed Mushrooms", price: 290  , image: "/images/Images-6.jpg", bowlsAvailable: 24},
      { id: 9, name: "Beef Wellington", price: 570  , image: "/images/Images-7.jpg", bowlsAvailable: 7 },
    ],
  },
  {
    id: 3,
    name: "TasteBuds Heaven",
    products: [
      { id: 1, name: "Spaghetti Carbonara", price: 220 , image: "/images/Images-7.jpg", bowlsAvailable: 7 },
      { id: 2, name: "Four Cheese Pizza", price: 280  , image: "/images/Images-1.jpg", bowlsAvailable: 13},
      { id: 3, name: "Garlic Shrimp Pasta", price: 350,  image: "/images/Images-6.jpg", bowlsAvailable: 7 },
      { id: 4, name: "Margherita Pizza", price: 250 , image: "/images/Images-5.jpg", bowlsAvailable: 21 },
      { id: 5, name: "Tiramisu", price: 180,  image: "/images/Images-4.jpg", bowlsAvailable: 1 },
      { id: 6, name: "Caprese Salad", price: 160,  image: "/images/Images-3.jpg", bowlsAvailable: 10 },
      { id: 7, name: "Bruschetta", price: 190 ,  image: "/images/Images-2.jpg", bowlsAvailable: 27 },
      { id: 8, name: "Fettuccine Alfredo", price: 300 , image: "/images/Images-1.jpg", bowlsAvailable: 5 },
      { id: 9, name: "Risotto Milanese", price: 280,  image: "/images/Images-8.jpg", bowlsAvailable: 26 },
    ],
  },
  {
    id: 4,
    name: "Epicurean Delights",
    products: [
      { id: 1, name: "Duck Confit", price: 400 , image: "/images/Images.jpg", bowlsAvailable: 7},
      { id: 2, name: "Foie Gras Terrine", price: 600 , image: "/images/Images-1.jpg", bowlsAvailable: 18 },
      { id: 3, name: "Beef Bourguignon", price: 350 , image: "/images/Images-8.jpg", bowlsAvailable: 2 },
      { id: 4, name: "Ratatouille", price: 250 , image: "/images/Images-6.jpg", bowlsAvailable: 21 },
      { id: 5, name: "Soufflé au Chocolat", price: 280 , image: "/images/Images-2.jpg", bowlsAvailable: 0 },
      { id: 6, name: "Caviar Plate", price: 700  , image: "/images/Images-4.jpg", bowlsAvailable: 13},
      { id: 7, name: "Lobster Thermidor", price: 650 , image: "/images/Images-3.jpg", bowlsAvailable: 11 },
      { id: 8, name: "Croque Monsieur", price: 240 , image: "/images/Images-5.jpg", bowlsAvailable: 3 },
      { id: 9, name: "Cheese Fondue", price: 300 , image: "/images/Images-7.jpg", bowlsAvailable: 5 },
    ],
  },
  {
    id: 5,
    name: "Flavor Town",
    products: [
      { id: 1, name: "BBQ Pulled Pork Sandwich", price: 180 , image: "/images/Images.jpg", bowlsAvailable: 5},
      { id: 3, name: "Loaded Nachos", price: 200 , image: "/images/Images-1.jpg", bowlsAvailable: 1 },
      { id: 4, name: "Philly Cheesesteak", price: 260 , image: "/images/Images-7.jpg", bowlsAvailable: 15 },
      { id: 5, name: "Triple Chocolate Brownie", price: 150 , image: "/images/Images-2.jpg", bowlsAvailable: 25 },
      { id: 6, name: "Mac and Cheese", price: 190  , image: "/images/Images-3.jpg", bowlsAvailable: 12},
      { id: 7, name: "Chili Cheese Fries", price: 170  , image: "/images/Images-8.jpg", bowlsAvailable: 16},
      { id: 8, name: "Fried Pickles", price: 140 , image: "/images/Images-5.jpg", bowlsAvailable: 22 },
      { id: 9, name: "Corn Dogs", price: 160 , image: "/images/Images-4.jpg", bowlsAvailable: 8 },
    ],
  },
];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurantId, page = 1, pageSize = 9 } = req.query;

  if (!restaurantId) {
    return res.status(400).json({ message: "Restaurant ID is required" });
  }

  const restaurant = restaurants.find((r) => r.id === Number(restaurantId));

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);

  const paginatedProducts = restaurant.products.slice(startIndex, endIndex);
  const hasMore = endIndex < restaurant.products.length;

  res.status(200).json({
    name: restaurant.name,
    products: paginatedProducts,
    hasMore,
  });
}

