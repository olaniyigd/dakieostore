"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchResults = ({ results }) => {
    const router = useRouter();

    // Function to handle click event and navigate to the details page with the item id
    const handleClick = (id) => {
        // Perform full page reload to the details page
        window.location.href = `/details/${id}`;
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
        <div className="container mx-auto p-4 bg-gray-100 rounded mt-4">
            {results.length > 0 ? (
                <ul className="flex flex-wrap -mx-2">
                    {results.map((item) => (
                        <li
                            key={item.id}
                            className="w-full flex justify-center cursor-pointer items-center md:w-1/2 lg:w-[20%] px-2 py-2"
                            onClick={() => handleClick(item.id)} // Pass the id to handleClick
                        >
                            <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center h-64 w-64">
                                <div className="flex-shrink-0 mb-2">
                                    <Image
                                        src={item.images}
                                        height={100}
                                        width={100}
                                        alt={item.name}
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-black font-bold mb-2 text-center">{item.title}</h3>
                                <p className="text-black text-center mb-2">{item.description}</p>
                                <p className="text-black font-bold text-center"> {getCurrencySymbol()}
                                {item.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-black text-center">No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
