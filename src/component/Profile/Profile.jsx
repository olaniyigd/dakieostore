import { AiOutlineUser } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import ProfileTab from "./ProfileTab";




export default function Profile (){
    return(
        <div className="container mx-auto w-full">
            <div className="flex items-center gap-5 mt-3">
                <div className="bg-gray-800 p-10 rounded-[10px]">
                <AiOutlineUser className="text-[70px] text-white"/>
                </div>
                <div>
                    <p className="text-[20px] font-[700]">Faruq</p>
                    <div className="flex gap-8 items-center my-3">
                        <div className="flex gap-3 items-center">
                        <IoLocationOutline />
                        <p>No 13, Omugo Crescent, Lagos</p>
                        </div>
                        <div className="flex gap-3 items-center">
                        <MdOutlinePhone />
                        <p>+2348107265575</p>
                        </div>
                        <div className="flex gap-3 items-center">
                        <MdOutlineEmail />
                        <p>faruq@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-800 p-3 rounded-[10px]">
                            <MdOutlineShoppingCart className="text-white"/>
                            </div>
                            <div>
                                <p>200</p>
                                <p>Total Orders</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-800 p-3 rounded-[10px]">
                            <TbTruckDelivery className="text-white"/>
                            </div>
                            <div>
                                <p>200</p>
                                <p>Orders Delivered</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-800 p-3 rounded-[10px]">
                            <LuRefreshCw className="text-white"/>
                            </div>
                            <div>
                                <p>200</p>
                                <p>Orders Processing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileTab />
        </div>
    )
}