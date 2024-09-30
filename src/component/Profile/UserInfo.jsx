"use client"
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

export default function UserInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: 'Faruq',
        lastName: 'Gbadegesin',
        address: 'Lagos, Nigeria',
        phoneNumber: '+2348107265575'
    });

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleUpdate = () => {
        // Handle update logic here (e.g., API call to update user info)
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-5 rounded-full">
                    <AiOutlineUser className="text-[50px] text-white" />
                </div>
                <div>
                    <p>{userInfo.firstName}</p>
                    <p>{userInfo.address}</p>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center my-4">
                    <p>Personal Information</p>
                    <p className="border border-gray-800 p-1 rounded-[10px] cursor-pointer" onClick={handleEditClick}>Edit</p>
                </div>
                <div className="flex justify-between w-[50%]">
                    <div>
                        <p className='text-gray-400'>First Name</p>
                        <p>{userInfo.firstName}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Last Name</p>
                        <p>{userInfo.lastName}</p>
                    </div>
                </div>
                <div className="flex justify-between w-[50%] my-4">
                    <div>
                        <p className='text-gray-400'>Address</p>
                        <p>{userInfo.address}</p>
                    </div>
                    <div>
                        <p className='text-gray-400'>Phone Number</p>
                        <p>{userInfo.phoneNumber}</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[300px]">
                        <h2 className="text-lg font-bold mb-4">Edit Information</h2>
                        <div className="mb-4">
                            <label className="block text-sm">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
