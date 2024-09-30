// pages/index.js

import ClothingItem from "./ClothingItem";

const HomePage = () => {
  const items = [
    {
      id: 1,
      image: '/assets/female6.png',
      title: 'T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 20,
    },
    {
      id: 2,
      image: '/assets/female6.png',
      title: 'Jeans',
      description: 'Stylish blue jeans',
      price: 40,
    },
    {
      id: 3,
      image: '/assets/female6.png',
      title: 'Jacket',
      description: 'Warm winter jacket',
      price: 60,
    },
    {
      id: 4,
      image: '/assets/female6.png',
      title: 'Sneakers',
      description: 'Sporty sneakers',
      price: 50,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Clothing Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <ClothingItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
