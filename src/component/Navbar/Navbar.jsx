"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import Login from '../molecule/SignIn';
import Signup from '../molecule/Signup';
import Modal from '../molecule/Modal';
import LoadingSpinner from '../molecule/Spinner';
import { FaRegCircleUser } from "react-icons/fa6";


const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true)

  // Load selected currency from localStorage on component mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    } else {
      localStorage.setItem('selectedCurrency', 'NGN');
    }
  }, []);

  const handleServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
    setIsProductsOpen(false); // Close the Products dropdown
  };

  const handleProductsClick = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsServicesOpen(false); // Close the Services dropdown
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
    setIsProductsOpen(false); // Close the Products dropdown after selection
    // Reload the page after 2 seconds
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLoginPopup = () => {
    setIsLoginOpen(true);
    setIsServicesOpen(false);
  };

  const openSignupPopup = () => {
    setIsSignupOpen(true);
    setIsServicesOpen(false);
  };

  return (
    <nav className="w-full bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-400 text-white">Home</Link>
          <Link href="/about" className="hover:text-gray-400 text-white">About</Link>
          <Link href="/contact" className="hover:text-gray-400 text-white">Contact</Link>
          <Link href="/help" className="hover:text-gray-400 text-white">Help</Link>
          <Link href="/faq" className="hover:text-gray-400 text-white">FAQ</Link>
        </div>
        <div className="hidden md:flex gap-3">
          {
            isLogin ? (
              <Link href="/profile" className='flex items-center gap-2 border py-[3px] px-[10px] rounded-[5px]'>
                <FaRegCircleUser className='text-white'/>
                <p className='text-white'>Faruq</p>
              </Link>
            ):(
              <div className="relative inline-block">
                <button
                  className="hover:text-gray-400 text-white border flex items-center py-[3px] px-[10px] rounded-[5px]"
                  onClick={handleServicesClick}
                >
                  My account
                  <MdKeyboardArrowDown className={`ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {isServicesOpen && (
                  <div className="absolute mt-2 w-39 bg-white border border-gray-200 shadow-lg z-50">
                    <button onClick={openLoginPopup} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Sign In</button>
                    <button onClick={openSignupPopup} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Sign Up</button>
                  </div>
                )}
              </div>

            )
          }

          <div className="relative inline-block">
            <button
              className="hover:text-gray-400 border text-white flex items-center py-[3px] px-[10px] rounded-[5px]"
              onClick={handleProductsClick}
            >
              {selectedCurrency || <LoadingSpinner />}
              <MdKeyboardArrowDown className={`ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {isProductsOpen && (
              <div className="absolute mt-2 bg-white border border-gray-200 shadow-lg z-50">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => { handleCurrencyChange('GBP'); }}
                >
                  GBP
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => { handleCurrencyChange('USD'); }}
                >
                  USD
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => { handleCurrencyChange('NGN'); }}
                >
                  NGN
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="block md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-md z-50">
          <div className="flex flex-col items-center justify-center h-full space-y-4 relative">
            <button className="absolute top-4 right-4" onClick={toggleMobileMenu}>
              <MdClose size={24} />
            </button>
            <Link href="/" className="text-gray-800 hover:text-gray-400 text-xl" onClick={toggleMobileMenu}>Home</Link>
            <Link href="/about" className="text-gray-800 hover:text-gray-400 text-xl" onClick={toggleMobileMenu}>About</Link>
            <Link href="/contact" className="text-gray-800 hover:text-gray-400 text-xl" onClick={toggleMobileMenu}>Contact</Link>
            <Link href="/help" className="text-gray-800 hover:text-gray-400 text-xl" onClick={toggleMobileMenu}>Help</Link>
            <Link href="/faq" className="text-gray-800 hover:text-gray-400 text-xl" onClick={toggleMobileMenu}>FAQ</Link>
            <div className="mt-4">
              <button
                className="text-gray-800 hover:text-gray-400 text-xl"
                onClick={handleServicesClick}
              >
                My account
                <MdKeyboardArrowDown className={`ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {isServicesOpen && (
                <div className="bg-white border border-gray-200 shadow-lg mt-2">
                  <button onClick={openLoginPopup} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Sign In</button>
                  <button onClick={openSignupPopup} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Sign Up</button>
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                className="text-gray-800 hover:text-gray-400 text-xl"
                onClick={handleProductsClick}
              >
                {selectedCurrency}
                <MdKeyboardArrowDown className={`ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {isProductsOpen && (
                <div className="bg-white border border-gray-200 shadow-lg mt-2">
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={() => { handleCurrencyChange('GBP'); }}
                  >
                    GBP
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={() => { handleCurrencyChange('USD'); }}
                  >
                    USD
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={() => { handleCurrencyChange('NGN'); }}
                  >
                    NGN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Modal onClose={() => setIsLoginOpen(false)}>
            <Login />
          </Modal>
        </div>
      )}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Modal onClose={() => setIsSignupOpen(false)}>
            <Signup />
          </Modal>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
