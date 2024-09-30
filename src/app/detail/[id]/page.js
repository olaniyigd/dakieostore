// src/app/itemDetails.js
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // corrected import
import { useParams } from 'next/navigation'; // corrected import

const ItemDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic segment
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isInCart, setIsInCart] = useState(false); // New state for checking if item is in cart
  const [selectedSize, setSelectedSize] = useState(''); // New state for selected size
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isDeliveryFree, setIsDeliveryFree] = useState(false); // Assuming delivery is free
  const [error, setError] = useState('');

  // Load selected currency from localStorage on component mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        // Hardcoded item data (replace with actual fetching logic)
        const items = [
          {
            id: 5,
            images: ['/assets/obirin1.png', '/assets/obirin2.jpg'],
            title: 'Hoodie',
            description: 'premium Hoodie – the perfect blend of comfort, style, and durability.',
            price: 5000, // Base price in NGN (20000 kobo)
            details: 'Introducing our premium Hoodie – crafted for comfort and style. Made from a soft cotton blend, it offers plush warmth with reinforced durability. Featuring a modern fit, adjustable hood, and convenient pockets, its perfect for any occasion.',
            sizes: ['S', 'M', 'L', 'XL'],
          },
          {
            id: 6,
            images: ['/assets/shirt1.png', '/assets/shirt2.png'],
            title: 'Shirt',
            description: "Stylish shirt that pairs well with jeans or shorts.",
            price: 10000, // Base price in NGN (40000 kobo)
            details: 'This is a detailed description of the Jeans.',
            sizes: ['S', 'M', 'L', 'XL'],
          },
          {
            id: 7,
            images: ['/assets/cap1.jpg', '/assets/cap2.jpg'],
            title: "Cap",
            description: "Fashionable cap to complete your casual look.",
            price: 5000, // Base price in NGN (60000 kobo)
            details: 'This is a detailed description of the Jacket.',
            sizes: ['S', 'M', 'L', 'XL'],
          },
          {
            id: 8,
            images: ['/assets/jean.png'],
            title: "Jean",
            description: "Classic blue jeans, perfect for a timeless style.",
            price: 19000, // Base price in NGN (50000 kobo)
            details: 'This is a detailed description of the Sneakers.',
            sizes: ['S', 'M', 'L', 'XL'],
          },
        ];

        const foundItem = items.find(item => item.id === parseInt(id));
        if (foundItem) {
          setItem(foundItem);
          setMainImage(foundItem.images[0]); // Set the initial main image
          
          // Check if the item is already in the cart
          const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const isItemInCart = storedCartItems.some(cartItem => cartItem.id === foundItem.id);
          setIsInCart(isItemInCart);
        }
      }
    };

    fetchItem();
  }, [id]);

  // Function to calculate and format price based on selected currency
  const getPriceForCurrency = (itemPrice, currency) => {
    switch (currency) {
      case 'GBP':
        return `£${(itemPrice / 1700).toFixed(2)}`; // Divide item price by 1700 for GBP
      case 'USD':
        return `$${(itemPrice / 1600).toFixed(2)}`; // Divide item price by 1600 for USD
      case 'NGN':
        return `₦${itemPrice.toLocaleString()}`; // Format NGN with comma separator
      default:
        return '0.00';
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart');
  
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
  
      return;
    }
  
    // Get existing cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Add the new item to the cart with selected size
    const updatedCartItems = [...storedCartItems, { ...item, selectedSize }];
    // Store the updated cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    // Refresh the window to update the cart items
    window.location.reload();
  };

  const handleLocationChange = (e) => {
    setDeliveryLocation(e.target.value);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container flex justify-around mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
            <img src={mainImage || item.images[0]} alt={item.title} className="object-cover rounded-lg max-h-96" />
            <div className="flex justify-center mt-4">
              {item.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={item.title}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer mr-2 border ${image === mainImage ? 'border-gray-800' : 'border-gray-300'}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-4 lg:w-1/2">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-green-600 font-bold mt-2">
              {getPriceForCurrency(item.price, selectedCurrency)}
            </p>
            <p className="text-gray-800 mt-4">{item.details}</p>
            
            {/* Size Selection */}
            <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-2">
                Select Size:
              </label>
              <div className="flex space-x-4">
                {item.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Add to Cart Button */}
            {!isInCart && (
              <button
                onClick={handleAddToCart}
                className="mt-4 bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* Delivery Location */}
        <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-2">
                Delivery Location:
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={handleLocationChange}
                placeholder="Enter delivery location"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Delivery Info */}
            <p className="text-gray-600 mt-2">
              {isDeliveryFree ? 'Delivery is free!' : 'Delivery charges may apply.'}
            </p>
      </div>
    </div>
  );
};

export default ItemDetails;
