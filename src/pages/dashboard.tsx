import { useRouter } from "next/router";
import { useEffect, useState, useRef} from "react";
import Image from 'next/image';


type Product = {
    id: number;
    name: string;
    price: number;
    bowlsAvailable: number;
    image: string;
    quantity: number;
    note: string;
  };

  type Restaurant = {
    name: string;
    products: Product[];
  };

  const MAX_EXTRA_ROWS = 5; 
  const ROW_SIZE = 3; 


const Dashboard = () => {
  const router = useRouter();
  const { restaurantId, waiterName } = router.query;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("dine-in");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [extraRows, setExtraRows] = useState(0); // Contador de filas adicionales cargadas

  const observerRef = useRef<HTMLDivElement | null>(null);




  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000)); 
    if (restaurantId) {
        fetch(`/api/products?restaurantId=${restaurantId}`)
          .then((res) => res.json())
          .then((data) => {
            setRestaurant(data);
            setProducts(data.products);
            setProducts(data.products.slice(0, 6));
            setHasMore(data.products.length > 6); 
          })
          .catch((err) => console.error("Error fetching data:", err));
      }
    }, [restaurantId]);

    const fetchProducts = () => {
      if (!restaurant || !restaurant.products || isLoading || extraRows >= MAX_EXTRA_ROWS) {
        setHasMore(false); 
        return;
      }
      
        setIsLoading(true); 

        const totalProducts = restaurant.products.length;
      
        const startIndex = products.length % totalProducts;
        const endIndex = startIndex + ROW_SIZE;
      
        const nextPageProducts =
        endIndex > totalProducts
          ? restaurant.products.slice(startIndex, totalProducts)
          : restaurant.products.slice(startIndex, endIndex);
  
      setProducts((prev) => [...prev, ...nextPageProducts]);
      setExtraRows((prev) => prev + 1); 
  
      setIsLoading(false);
      setHasMore(extraRows + 1 < MAX_EXTRA_ROWS); 
    };
      
   useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore) {
              fetchProducts();
            }
          },
          { threshold: 1.0 }
        );
    
        if (observerRef.current) observer.observe(observerRef.current);
    
        return () => {
          if (observerRef.current) observer.disconnect();
        };
      }, [hasMore, products]);
      


       const handleSelectProduct = (productId: number) => {
        if (!restaurant || !restaurant.products) return;
      
        
        const product = restaurant.products.find((p) => p.id === productId);
        if (product && product.bowlsAvailable > 0) {
    
          setIsSidebarOpen(true);
      
        
          setOrderItems((prev) => {
            const existingItem = prev.find((item) => item.id === productId);
            if (existingItem) {
              return prev.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            }
            return [...prev, { ...product, quantity: 1, note: '' }];
          });
      
          const updatedProducts = products.map((p) =>
            p.id === productId ? { ...p, bowlsAvailable: p.bowlsAvailable - 1 } : p
          );
          setProducts(updatedProducts);
        }
      };
      

       const handleRemoveFromOrder = (id:number) => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
      };


       const handleNoteChange = (id:number, note:string) => {
    setOrderItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
      };

       const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
      };

       const handleButtonClick = (option : string) => {
       setSelectedOption(option);
       };
  
  if (!restaurant) return <p className="text-white">Loading...</p>;


  return (
    <div className="flex min-h-screen bg-primaryBg text-white">
   
      <div
        className={`flex-1 transition-transform ${
          isSidebarOpen ? 'mr-[400px]' : ''
        }`}
      >
        <header className="p-10 px-20 bg-[#1F1D2B] flex flex-col sm:flex-row sm:justify-between sm:items-center  gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p>Waiter: {waiterName}</p>
            <p>Order: {orderNumber}</p>
          </div>

          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search for food"
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white w-full sm:w-auto focus:ring-2 focus:ring-[#EA7C69] focus:outline-none"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
              <Image
                src="/images/search.svg" 
                alt="Search"
                width={20} 
                height={20} 
              />
            </div>
          </div>
        </header>

        <main className="px-6 py-8 max-w-screen-lg mx-auto text-center sm:text-left">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 border-b border-gray-700 pb-2">
            {['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'].map((category, index) => (
              <li
                key={index}
                className={`text-sm font-medium cursor-pointer ${
                  category === 'Hot Dishes'
                    ? 'text-[#EA7C69] border-b-2 border-[#EA7C69]'
                    : 'text-gray-400 hover:text-[#EA7C69]'
                } whitespace-nowrap`}
              >
                {category}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4 sm:mb-0">Choose Dishes</h2>
            <div className="relative">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="appearance-none bg-[#1F1D2B] text-white py-2 px-4 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#EA7C69] w-full sm:w-auto"
            >
                <option value="dine-in">Dine In</option>
                <option value="to-go">To Go</option>
                <option value="delivery">Delivery</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Image
                  src="/images/arrow-down.svg"
                  alt="Arrow"
                  className="text-gray-400"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {products.map((product, index) => (
              <div
              key={`${product.id}-${index}`} 
                className="bg-[#1F1D2B] w-[250px] h-[260px] rounded-[16px] shadow-lg hover:shadow-xl transition-all duration-300 relative mb-10 transform hover:scale-105"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="rounded-full object-cover absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-[#2D303E]"
                  width={152}
                  height={152}
                />
                <div className="mt-[120px] text-center px-4">
                  <h3 className="text-base font-semibold text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">{product.bowlsAvailable} Bowls available</p>
                  <button
                    onClick={() => handleSelectProduct(product.id)}
                    disabled={product.bowlsAvailable === 0}
                    className={`mt-3 py-1 px-3 rounded-lg text-sm ${
                      product.bowlsAvailable > 0
                        ? 'bg-[#EA7C69] text-white hover:bg-[#D96A5C]'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.bowlsAvailable > 0 ? 'Add to Order' : 'Sold Out'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {hasMore && <div ref={observerRef} className="h-10"></div>}

        </main>
      </div>

      {/* Sidebar */}
      <aside
  className={`w-[400px] max-w-full bg-[#1F1D2B] fixed right-0 top-0 h-full transition-transform ${
    isSidebarOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="p-6 relative">

    <button
      onClick={() => setIsSidebarOpen(false)}
      className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
    >
      <Image
        src="/images/close-button.svg" 
        alt="Close"
        width={24}
        height={24}
      />
    </button>

    <h2 className="text-lg font-bold mb-6 text-center sm:text-left">Order #{orderNumber}</h2>

  
    <div className="flex justify-around mb-4">
      {["dine-in", "to-go", "delivery"].map((option) => (
        <button
          key={option}
          onClick={() => handleButtonClick(option)}
          className={`px-4 py-2 rounded-lg border transition ${
            selectedOption === option
              ? "border-[#EA7C69] bg-[#EA7C69] text-white"
              : "border-gray-700 text-gray-400 hover:text-white hover:border-[#EA7C69]"
          }`}
        >
          {option.replace("-", " ").toUpperCase()}
        </button>
      ))}
    </div>


    <div className="space-y-4">
      {orderItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4">
          <Image
            src={item.image}
            alt={item.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-sm font-medium">{item.name}</h3>
            <p className="text-sm text-gray-400">
              ${item.price.toFixed(2)}
            </p>
            <input
              type="text"
              value={item.note}
              onChange={(e) => handleNoteChange(item.id, e.target.value)}
              placeholder="Order Note..."
              className="w-full mt-2 px-2 py-1 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-[#EA7C69] focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center ">
            <span>{item.quantity}</span>

            <button
              onClick={() => handleRemoveFromOrder(item.id)}
              className="text-[#EA7C69] hover:text-white transition mt-2"
            >
              <Image
                src="/images/button-trash.svg"
                alt="Remove"
                width={40}
                height={40}
                className="hover:opacity-80 transition"
              />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Subtotal y botón de envío */}
    <div className="mt-6">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button className="mt-4 w-full py-2 bg-[#EA7C69] text-white rounded-lg">
        Send Order
      </button>
    </div>
  </div>
</aside>


    </div>
  );
};

export default Dashboard;
