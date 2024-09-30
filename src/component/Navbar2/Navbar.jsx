import Link from 'next/link';
import { useState } from 'react';
import SearchResults from '../search/Search';

const items = [
  {
    id: 1,
    images: '/assets/hodd1.png',
    title: 'Hoodie',
    description: 'premium Hoodie – the perfect blend of comfort, style, and durability.',
    price: 25000, // Base price in NGN (20000 kobo)
    details: 'Introducing our premium Hoodie – crafted for comfort and style. Made from a soft cotton blend, it offers plush warmth with reinforced durability. Featuring a modern fit, adjustable hood, and convenient pockets, its perfect for any occasion.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    images: '/assets/shirt1.png',
    title: 'Shirt',
    description: "Stylish shirt that pairs well with jeans or shorts.",
    price: 10000, // Base price in NGN (40000 kobo)
    details: 'This is a detailed description of the Jeans.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    images: '/assets/cap1.jpg',
    title: "Cap",
    description: "Fashionable cap to complete your casual look.",
    price: 5000, // Base price in NGN (60000 kobo)
    details: 'This is a detailed description of the Jacket.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    images: '/assets/jean.png',
    title: "Jean",
    description: "Classic blue jeans, perfect for a timeless style.",
    price: 19000, // Base price in NGN (50000 kobo)
    details: 'This is a detailed description of the Sneakers.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    images: '/assets/obirin1.png',
    title: 'Hoodie',
    description: 'premium Hoodie – the perfect blend of comfort, style, and durability.',
    price: 5000, // Base price in NGN (20000 kobo)
    details: 'Introducing our premium Hoodie – crafted for comfort and style. Made from a soft cotton blend, it offers plush warmth with reinforced durability. Featuring a modern fit, adjustable hood, and convenient pockets, its perfect for any occasion.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    images: '/assets/shirt1.png',
    title: 'Shirt',
    description: "Stylish shirt that pairs well with jeans or shorts.",
    price: 10000, // Base price in NGN (40000 kobo)
    details: 'This is a detailed description of the Jeans.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 7,
    images: '/assets/cap1.jpg',
    title: "Cap",
    description: "Fashionable cap to complete your casual look.",
    price: 5000, // Base price in NGN (60000 kobo)
    details: 'This is a detailed description of the Jacket.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    images: '/assets/jean.png',
    title: "Jean",
    description: "Classic blue jeans, perfect for a timeless style.",
    price: 19000, // Base price in NGN (50000 kobo)
    details: 'This is a detailed description of the Sneakers.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

const Navbar2 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);

    const results = items.filter(item =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredItems(results);
  };

  return (
    <nav className="bg-[white] p-4">
      <div className="container mx-auto flex justify-around items-center">
        {/* Logo */}
        <div className="text-black text-[25px] tracking-widest font-bold">
          <Link href="/">DAKIEO</Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded border text-black"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Customer Support Number */}
        <div className="text-black">
          <a href="tel:123-456-7890">Customer Support: 123-456-7890</a>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && <SearchResults results={filteredItems} />}
    </nav>
  );
};

export default Navbar2;
