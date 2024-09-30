"use client"
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";
import UserInfo from "./UserInfo";
import Order from "./Order";

export default function ProfileTab() {
    const [selectedTab, setSelectedTab] = useState("Profile");

    return (
        <div className="mt-5 flex items-start gap-[50px]">
            <div className="flex flex-col gap-3">
                <div 
                    className={`flex gap-2 items-center cursor-pointer ${selectedTab === "Profile" ? "bg-gray-800 p-2 rounded-[10px] text-white" : ""}`} 
                    onClick={() => setSelectedTab("Profile")}
                >
                    <LuUser />
                    <p>Profile</p>
                </div>
                <div 
                    className={`flex gap-2 items-center cursor-pointer ${selectedTab === "My Order" ? "bg-gray-800 p-2 rounded-[10px] text-white" : ""}`} 
                    onClick={() => setSelectedTab("My Order")}
                >
                    <FiPackage />
                    <p>My Order</p>
                </div>
                <div 
                    className={`flex gap-2 items-center cursor-pointer ${selectedTab === "Wishlist" ? "bg-gray-800 p-2 rounded-[10px] text-white" : ""}`} 
                    onClick={() => setSelectedTab("Wishlist")}
                >
                    <AiOutlineHeart />
                    <p>Wishlist</p>
                </div>
                <div 
                    className={`flex gap-2 items-center cursor-pointer ${selectedTab === "Live Chat" ? "bg-gray-800 p-2 rounded-[10px] text-white" : ""}`} 
                    onClick={() => setSelectedTab("Live Chat")}
                >
                    <BsChatDots />
                    <p>Live Chat</p>
                </div>
                <div 
                    className={`flex gap-2 items-center cursor-pointer ${selectedTab === "Help & Support" ? "bg-gray-800 p-2 rounded-[10px] text-white" : ""}`} 
                    onClick={() => setSelectedTab("Help & Support")}
                >
                    <MdHelpOutline />
                    <p>Help & Support</p>
                </div>
            </div>
            <div className="border p-4 w-[50%]">
                {selectedTab === "Profile" && <UserInfo />}
                {selectedTab === "My Order" && <Order />}
                {selectedTab === "Wishlist" && <p>Wishlist</p>}
                {selectedTab === "Live Chat" && <p>Chat</p>}
                {selectedTab === "Help & Support" && <p>Help & Support</p>}
            </div>
        </div>
    );
}
