"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'; 
import { MdMenu } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa'; 

const Navbar3 = () => {
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    const toggleCategoryDropdown = () => {
        setCategoryDropdownOpen(!categoryDropdownOpen);
    };

    const handlePagesDropdownEnter = () => {
        setPagesDropdownOpen(true);
    };

    const handlePagesDropdownLeave = () => {
        setPagesDropdownOpen(false);
    };

    const updateCartItemCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log(cartItems)
        setCartItemCount(cartItems.length);
        console.log(cartItems.length)
    };

    useEffect(() => {
        updateCartItemCount();

        window.addEventListener('storage', updateCartItemCount);

        return () => {
            window.removeEventListener('storage', updateCartItemCount);
        };
    }, []);

    return (
        <div className='bg-gray-800'>
            <nav className="p-4 flex container mx-auto justify-between items-center">
                <div className="flex items-center space-x-4 relative">
                    <button onClick={toggleCategoryDropdown} className="text-white flex items-center border py-[3px] px-[10px] rounded-[5px]">
                        <MdMenu className="h-6 w-6 mr-2" />
                        Category
                        <FaChevronDown className={`ml-2 transition-transform ${categoryDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {categoryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-4 w-40 z-30 bg-white text-black shadow-lg">
                            <Link href="/men-wear" className="block px-4 py-2 hover:bg-gray-200">Men wear</Link>
                            <Link href="/women-wear" className="block px-4 py-2 hover:bg-gray-200">Women wear</Link>
                            <Link href="/children-wear" className="block px-4 py-2 hover:bg-gray-200">Children wear</Link>
                        </div>
                    )}
                </div>
                <div className="flex space-x-8 relative">
                    <Link href="/shop" className="text-white hover:text-gray-300">Shop</Link>
                    <Link href="/shop-detail" className="text-white hover:text-gray-300">Shop Detail</Link>
                    <div className="group relative" onMouseEnter={handlePagesDropdownEnter} onMouseLeave={handlePagesDropdownLeave}>
                        <button className="text-white flex items-center">
                            Pages
                            <FaChevronDown className={`ml-2 transition-transform ${pagesDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        {pagesDropdownOpen && (
                            <div className="absolute left-0 mt-0 w-40 z-30 bg-white text-black shadow-lg">
                                <Link href="/hello" className="block px-4 py-2 hover:bg-gray-200">Shopping Cart</Link>
                                <Link href="/hi" className="block px-4 py-2 hover:bg-gray-200">My order</Link>
                            </div>
                        )}
                    </div>
                </div>
                <Link href="/checkout" className="text-white flex items-center relative">
                    <FaShoppingCart className="h-6 w-6" />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs px-1">{cartItemCount}</span> {/* Displaying the cart item count */}
                </Link>
            </nav>
        </div>
    );
};

export default Navbar3;
