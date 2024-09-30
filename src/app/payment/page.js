"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentPage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('NGN');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [walletId, setWalletId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    const storedAmount = localStorage.getItem('totalAmount');
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedAmount) {
      setAmount(Number(storedAmount));
    }
    if (storedCurrency) {
      setCurrency(storedCurrency);
    } else {
      router.push('/cart');
    }
  }, [router]);

  const getPriceForCurrency = (amount, currency) => {
    if (isNaN(amount) || !currency) return '0.00';

    switch (currency) {
      case 'GBP':
        return `£${(amount / 1700).toFixed(2)}`;
      case 'USD':
        return `$${(amount / 1600).toFixed(2)}`;
      case 'NGN':
        return `₦${amount.toLocaleString()}`;
      default:
        return '0.00';
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setWalletId('');
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setError('');
  };

  const validateForm = () => {
    if (paymentMethod === 'wallet') {
      if (!walletId) {
        setError('Please enter your wallet ID.');
        return false;
      }
    } else if (paymentMethod === 'credit-card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError('Please fill out all credit card details.');
        return false;
      }
      // Validate card number length
      if (cardNumber.length !== 16) {
        setError('Card number must be 16 digits.');
        return false;
      }
      // Validate expiry date
      if (!/^\d{2}\/\d{2}$/.test(expiryDate) || expiryDate.length !== 7) {
        setError('Expiry date must be in MM/YY format.');
        return false;
      }
      const month = Number(expiryDate.slice(0, 2));
      if (month < 1 || month > 12) {
        setError('Month must be between 01 and 12.');
        return false;
      }
      // Validate CVV
      if (!/^\d{3}$/.test(cvv)) {
        setError('CVV must be 3 digits.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handlePay = () => {
    if (validateForm()) {
      // Implement payment submission logic here
      setShowModal(true); 
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    // Validate month
    const month = value.slice(0, 2);
    if (month && (Number(month) < 1 || Number(month) > 12)) {
      setExpiryDate(value.slice(0, 2)); // Only allow valid months
      return;
    }

    setExpiryDate(value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }
    setCardNumber(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    setCvv(value);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewOrder = () => {
    localStorage.removeItem('totalAmount'); // Clear the amount from localStorage
    localStorage.removeItem('cartItems');  // Clear cart items from localStorage
    window.location.href = '/order'; // Navigate to the order page and reload the window
  };
  
  const handleContinueShopping = () => {
    localStorage.removeItem('totalAmount'); // Clear the amount from localStorage
    localStorage.removeItem('cartItems');  // Clear cart items from localStorage
    window.location.href = '/'; // Navigate to the shopping page and reload the window
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        {/* Payment Options and Inputs Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
          <div className="flex flex-col">
            <button
              onClick={() => handlePaymentMethodChange('wallet')}
              className={`p-4 mb-2 text-lg flex justify-between font-semibold ${paymentMethod === 'wallet' ? 'border border-red-500' : 'border border-gray-300'} rounded-lg`}
            >
              Wallet
              {paymentMethod === 'wallet' && (
                <span className="text-green-500 font-bold">Selected</span>
              )}
            </button>
            <button
              onClick={() => handlePaymentMethodChange('credit-card')}
              className={`p-4 text-lg flex justify-between font-semibold ${paymentMethod === 'credit-card' ? 'border border-red-500' : 'border border-gray-300'} rounded-lg`}
            >
              Credit Card
              {paymentMethod === 'credit-card' && (
                <span className="text-green-500 font-bold">Selected</span>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

          {/* Payment Method Specific Inputs */}
          {paymentMethod === 'wallet' ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Wallet Payment</h3>
              <div className="mb-4">
                <label htmlFor="walletId" className="block text-lg font-medium mb-2">Wallet ID:</label>
                <input
                  id="walletId"
                  type="text"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  placeholder="Enter your wallet ID"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                onClick={handlePay}
                className="w-full bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Pay
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Credit Card Payment</h3>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-lg font-medium mb-2">Card Number:</label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="Enter your card number"
                  maxLength="16"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="cardName" className="block text-lg font-medium mb-2">Card Name:</label>
                  <input
                    id="cardName"
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Enter card name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="expiryDate" className="block text-lg font-medium mb-2">Expiry Date:</label>
                  <input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength="7"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-lg font-medium mb-2">CVV:</label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="CVV"
                    maxLength="3"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <button
                onClick={handlePay}
                className="w-full bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Pay
              </button>
            </div>
          )}
        </div>

        {/* Delivery Address and Total Amount Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <div className="mb-4">
            <label htmlFor="address" className="block text-lg font-medium mb-2">Delivery Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <h3 className="text-lg font-bold mb-2">Total Amount:</h3>
          <p className="text-lg font-bold">{getPriceForCurrency(amount, currency)}</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <FaCheckCircle className="text-green-500 text-[80px] mb-4 mx-auto" />
            <h2 className="text-xl font-semibold mb-4">Payment Successful!</h2>
            <p className="mb-4">Your payment was processed successfully. <br/> Thank you for your purchase!</p>
            <button
              onClick={handleViewOrder}
              className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-4"
            >
              View Order
            </button>
            <button
              onClick={handleContinueShopping}
              className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default PaymentPage;
