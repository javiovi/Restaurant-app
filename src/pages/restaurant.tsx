import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const initialRestaurants = [
  { id: 1, name: 'SuperSano', waiters: ['Alice', 'Bob', 'Charlie'] },
  { id: 2, name: 'GourmetLand', waiters: ['David', 'Eve', 'Frank'] },
  { id: 3, name: 'TasteBuds Heaven', waiters: ['Grace', 'Hank', 'Ivy'] },
  { id: 4, name: 'Epicurean Delights', waiters: ['Josep', 'Emi', 'Lee'] },
  { id: 5, name: 'Flavor Town', waiters: ['Robert', 'Aretha', 'Monks'] },
];

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [selectedWaiter, setSelectedWaiter] = useState('');
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWaiterRestaurant, setNewWaiterRestaurant] = useState<number | null>(null);
  const [newWaiterName, setNewWaiterName] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  


  
  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRestaurant(Number(e.target.value));
    setSelectedWaiter('');
  };

 
  const handleWaiterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWaiter(e.target.value);
  };


  const handleSignIn = () => {
    if (password !== '1234') {
      setIsPasswordError(true);
      return;
    }
  
    setIsPasswordError(false);
    if (selectedRestaurant && selectedWaiter) {
      router.push(`/dashboard?restaurantId=${selectedRestaurant}&waiterName=${selectedWaiter}`);
    } else {
      alert('Please select a restaurant and waiter.');
    }
  };

  const handleAddWaiter = () => {
    if (!newWaiterRestaurant || !newWaiterName.trim()) {
      alert('Please select a restaurant and enter a waiter name.');
      return;
    }

    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === newWaiterRestaurant
          ? {
              ...restaurant,
              waiters: [...restaurant.waiters, newWaiterName],
            }
          : restaurant
      )
    );

    setNewWaiterName('');
    setNewWaiterRestaurant(null);
    setIsModalOpen(false);
  };

  const currentWaiters =
    selectedRestaurant !== null
      ? restaurants.find((r) => r.id === selectedRestaurant)?.waiters || []
      : [];

  return (
    <>
    <Head>
      <title>Restaurant App</title>
    </Head>
    <div className="min-h-screen flex items-center justify-center bg-primaryBg">
   
   <div
  className="bg-secondaryBg p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn mx-4"
>
  <h1 className="text-white text-2xl font-bold mb-6 text-center">Restaurant App</h1>

  {/* Restaurant Select */}
  <div className="mb-4">
    <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-300 mb-2">
      Restaurant Name
    </label>
    <select id='restaurantName'
      value={selectedRestaurant || ''}
      onChange={handleRestaurantChange}
      className="w-full px-2 py-2 rounded-lg bg-primaryBg text-white focus:ring-2 focus:ring-[#EA7C69] focus:outline-none"
    >
      <option value="" disabled>
        Select a Restaurant
      </option>
      {restaurants.map((restaurant) => (
        <option key={restaurant.id} value={restaurant.id}>
          {restaurant.name}
        </option>
      ))}
    </select>
  </div>

  {/* Waiter Select */}
  <div className="mb-4">
    <label htmlFor="waiterName" className="block text-sm font-medium text-gray-300 mb-2">Waiter Name</label>
    <select id='waiterName'
      value={selectedWaiter}
      onChange={handleWaiterChange}
      className="w-full px-2 py-2 rounded-lg bg-primaryBg text-white focus:ring-2 focus:ring-[#EA7C69] focus:outline-none"
      disabled={!selectedRestaurant}
    >
      <option value="" disabled>
        {selectedRestaurant ? 'Select a Waiter' : 'Select a Restaurant First'}
      </option>
      {currentWaiters.map((waiter, index) => (
        <option key={index} value={waiter}>
          {waiter}
        </option>
      ))}
    </select>
  </div>

  {/* Password Input */}
  <div className="mb-6">
    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
    <input id='password'
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={`w-full px-2 py-2 rounded-lg bg-primaryBg text-white focus:ring-2 ${
        isPasswordError ? 'focus:ring-red-500' : 'focus:ring-[#EA7C69]'
      } focus:outline-none`}
      placeholder="Enter password"
    />
    {/* Error message */}
    {isPasswordError && (
      <p className="text-sm text-red-500 mt-2">Incorrect password. Please try again.</p>
    )}
  </div>

  {/* Buttons */}
  <div className="flex flex-col gap-4">
    <button
      onClick={handleSignIn}
      className="w-full py-2 rounded-lg bg-[#EA7C69] text-white font-medium border border-transparent hover:bg-transparent hover:text-[#EA7C69] hover:border-[#EA7C69] transition-all duration-300 focus:ring-2 focus:ring-[#EA7C69]"
    >
       Sign In
    </button>
    <button
      onClick={() => setIsModalOpen(true)}
      className="w-full py-2 rounded-lg border border-[#EA7C69] text-[#EA7C69] font-medium hover:bg-[#EA7C69] hover:text-white hover:shadow-lg hover:shadow-[#EA7C69]/50 transition-all duration-300 focus:ring-2 focus:ring-[#EA7C69]"
    >
       Add User
    </button>
  </div>
</div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-secondaryBg p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-white text-xl font-bold mb-4">Add a New Waiter</h2>

            {/* Select Restaurant */}
            <div className="mb-4">
              <label htmlFor="restaurantSelect" className="block text-sm font-medium text-gray-300 mb-2">Select a Restaurant</label>
              <select id="restaurantSelect"

                value={newWaiterRestaurant || ''}
                onChange={(e) => setNewWaiterRestaurant(Number(e.target.value))}
                className="w-full px-2 py-2 rounded-lg bg-primaryBg text-white focus:ring-2 focus:ring-[#EA7C69] focus:outline-none"
              >
                <option value="" disabled>
                  Select a Restaurant
                </option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input New Waiter */}
            <input
              type="text"
              value={newWaiterName}
              onChange={(e) => setNewWaiterName(e.target.value)}
              className="w-full px-2 py-2 rounded-lg bg-primaryBg text-white focus:ring-2 focus:ring-[#EA7C69] focus:outline-none mb-4"
              placeholder="Enter waiter name"
            />

            {/* Buttons */}
            <button
              onClick={handleAddWaiter}
              className="w-full py-2 rounded-lg bg-[#EA7C69] text-white font-medium hover:bg-transparent hover:text-[#EA7C69] hover:border-[#EA7C69] border border-transparent transition-all duration-300 focus:ring-2 focus:ring-[#EA7C69]"
            >
              Add Waiter
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 mt-2 rounded-lg border border-[#EA7C69] text-[#EA7C69] font-medium hover:bg-[#EA7C69] hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
