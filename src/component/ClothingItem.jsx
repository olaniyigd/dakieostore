// components/ClothingItem.js
"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClothingItem = ({ id, image, title, description, price }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/details/${id}`);
  };

  const [selectedCurrency, setSelectedCurrency] = useState('');

  // Load selected currency from localStorage on component mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  // Function to determine currency symbol based on selectedCurrency
  const getCurrencySymbol = () => {
    switch (selectedCurrency) {
      case 'GBP':
        return '£';
      case 'USD':
        return '$';
      case 'NGN':
        return '₦';
      default:
        return '$'; // Default to dollar if selectedCurrency is not recognized
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer p-4 border rounded-lg hover:shadow-lg relative group">
      <div className="w-full h-[35vh] overflow-hidden rounded-lg flex items-center justify-center relative">
        <img src={image} alt={title} className="w-full h-full" />
        <button
          onClick={handleClick}
          className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold rounded-lg">
          Shop Now
        </button>
      </div>
      <div className="mt-2 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-green-600 font-bold">
          {getCurrencySymbol()}
          {price}
        </p>
      </div>
    </div>
  );
};

export default ClothingItem;
