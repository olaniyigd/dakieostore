"use client"
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ClothingItem from "@/component/ClothingItem";
import Carousel from "@/component/molecule/Carousel";
import Carousel2 from "@/component/molecule/Carousel2";
import LadyClothingItem from "@/component/LadyClothing";

const Home = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Load selected currency from localStorage on component mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      once: true, // Only animate once
    });
  }, []);

  // Function to calculate and format price based on selected currency
  const getPriceForCurrency = (itemName, currency) => {
    // Base prices in NGN
    const basePricesNGN = {
      "T-Shirt": 25000,
      "Jeans": 10000,
      "Jacket": 5000,
      "Sneakers": 19000,
    };

    switch (currency) {
      case "GBP":
        switch (itemName) {
          case "T-Shirt":
            return (basePricesNGN["T-Shirt"] / 1700).toFixed(2);
          case "Jeans":
            return (basePricesNGN["Jeans"] / 1700).toFixed(2);
          case "Jacket":
            return (basePricesNGN["Jacket"] / 1700).toFixed(2);
          case "Sneakers":
            return (basePricesNGN["Sneakers"] / 1700).toFixed(2);
          default:
            return "0.00";
        }
      case "USD":
        switch (itemName) {
          case "T-Shirt":
            return (basePricesNGN["T-Shirt"] / 1600).toFixed(2);
          case "Jeans":
            return (basePricesNGN["Jeans"] / 1600).toFixed(2);
          case "Jacket":
            return (basePricesNGN["Jacket"] / 1600).toFixed(2);
          case "Sneakers":
            return (basePricesNGN["Sneakers"] / 1600).toFixed(2);
          default:
            return "0.00";
        }
      case "NGN":
        return basePricesNGN[itemName].toLocaleString(); // Format NGN with comma separator
      default:
        return "0.00";
    }
  };



  const getPriceForCurrencys = (itemNames, currencys) => {
    // Base prices in NGN
    const basePricesNGN = {
      "T-Shirt": 5000,
      "Jeans": 10000,
      "Jacket": 5000,
      "Sneakers": 19000,
    };

    switch (currencys) {
      case "GBP":
        switch (itemNames) {
          case "T-Shirt":
            return (basePricesNGN["T-Shirt"] / 1700).toFixed(2);
          case "Jeans":
            return (basePricesNGN["Jeans"] / 1700).toFixed(2);
          case "Jacket":
            return (basePricesNGN["Jacket"] / 1700).toFixed(2);
          case "Sneakers":
            return (basePricesNGN["Sneakers"] / 1700).toFixed(2);
          default:
            return "0.00";
        }
      case "USD":
        switch (itemNames) {
          case "T-Shirt":
            return (basePricesNGN["T-Shirt"] / 1600).toFixed(2);
          case "Jeans":
            return (basePricesNGN["Jeans"] / 1600).toFixed(2);
          case "Jacket":
            return (basePricesNGN["Jacket"] / 1600).toFixed(2);
          case "Sneakers":
            return (basePricesNGN["Sneakers"] / 1600).toFixed(2);
          default:
            return "0.00";
        }
      case "NGN":
        return basePricesNGN[itemNames].toLocaleString(); // Format NGN with comma separator
      default:
        return "0.00";
    }
  };
  const items = [
    {
      id: 1,
      image: "/assets/hodd1.png",
      title: "Hoodie",
      description: "Comfortable cotton hoodie for casual comfort and warmth",
      price: getPriceForCurrency("T-Shirt", selectedCurrency),
    },
    {
      id: 2,
      image: "/assets/shirt1.png",
      title: "Shirt",
      description: "Stylish shirt that pairs well with jeans or shorts.",
      price: getPriceForCurrency("Jeans", selectedCurrency),
    },
    {
      id: 3,
      image: "/assets/cap1.jpg",
      title: "Cap",
      description: "Fashionable cap to complete your casual look.",
      price: getPriceForCurrency("Jacket", selectedCurrency),
    },
    {
      id: 4,
      image: "/assets/jean.png",
      title: "Jean",
      description: "Classic blue jeans, perfect for a timeless style.",
      price: getPriceForCurrency("Sneakers", selectedCurrency),
    },
  ];


  const Ladyitems = [
    {
      id: 5,
      image: "/assets/obirin1.png",
      title: "Hoodie",
      description: "Comfortable cotton hoodie for casual comfort and warmth",
      price: getPriceForCurrencys("T-Shirt", selectedCurrency),
    },
    {
      id: 6,
      image: "/assets/obirin3.jpg",
      title: "Shirt",
      description: "Stylish shirt that pairs well with jeans or shorts.",
      price: getPriceForCurrencys("Jeans", selectedCurrency),
    },
    {
      id: 7,
      image: "/assets/cap2.jpg",
      title: "Cap",
      description: "Fashionable cap to complete your casual look.",
      price: getPriceForCurrencys("Jacket", selectedCurrency),
    },
    {
      id: 8,
      image: "/assets/obirin5.png",
      title: "Jean",
      description: "Classic blue jeans, perfect for a timeless style.",
      price: getPriceForCurrencys("Sneakers", selectedCurrency),
    },
  ];
  return (
    <div className="container w-full mx-auto p-4">
      <div className="container flex flex-col gap-3 lg:gap-0 lg:flex-row w-full justify-around mx-auto p-4">
        <Carousel />
        <Carousel2 />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="font-[700] p-4 flex justify-between container mx-auto w-full">
          <p className=" text-[30px]">
          Latest Men Wears
          </p>
          <p className="cursor-pointer">View All</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} data-aos="fade-up">
              <ClothingItem {...item} />
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="font-[700] p-4 flex justify-between container mx-auto w-full">
          <p className=" text-[30px]">
          Latest Women Wears
          </p>
          <p className="cursor-pointer">View All</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Ladyitems.map((item) => (
            <div key={item.id} data-aos="fade-up">
              <LadyClothingItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;



