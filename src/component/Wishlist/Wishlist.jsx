"use client"
import { useState } from 'react';
import LadyClothingItem from '../LadyClothing';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      const itemExists = prevWishlist.some((wishlistItem) => wishlistItem.id === item.id);
      if (itemExists) {
        // If item is already in wishlist, remove it
        return prevWishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
      } else {
        // Add new item to wishlist
        return [...prevWishlist, item];
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <LadyClothingItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              onAddToWishlist={addToWishlist} 
              isWishlistItem={true} 
            />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
