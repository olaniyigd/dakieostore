"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [coupon, setCoupon] = useState('');
  const [deliveryType, setDeliveryType] = useState(''); // 'delivery' or 'pickup'
  const [error, setError] = useState(''); // Error message state
  const [couponMessage, setCouponMessage] = useState(''); // Coupon application feedback

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsWithQuantity = storedCartItems.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(cartItemsWithQuantity);

    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

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

  const getTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const handleQuantityChange = (index, increment) => {
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems[index];
    if (increment) {
      item.quantity += 1;
    } else {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items before checking out.');
      setTimeout(() => setError(''), 2000); // Clear error message after 2 seconds
      return;
    }
    
    if (!deliveryType) {
      setError('Please select either delivery or pickup.');
      setTimeout(() => setError(''), 2000); // Clear error message after 2 seconds
      return;
    }
    
    setError(''); // Clear error message

    // Store total amount and selected currency in local storage
    const totalAmount = getTotalAmount();
    const deliveryCharge = 300;
    const pickupCharge = 0;
    const deliveryFee = deliveryType === 'delivery' ? deliveryCharge : pickupCharge;
    const subtotal = totalAmount;
    const total = subtotal + deliveryFee;

    localStorage.setItem('totalAmount', total.toString());
    localStorage.setItem('selectedCurrency', selectedCurrency);

    // Navigate to payment page
    router.push('/payment');
  };

  const applyCoupon = () => {
    // Implement coupon logic here
    if (coupon === 'DISCOUNT10') {
      setCouponMessage('Coupon applied successfully!');
    } else {
      setCouponMessage('Invalid coupon code.');
    }
    setTimeout(() => setCouponMessage(''), 3000); // Clear coupon message after 3 seconds
  };

  const totalAmount = getTotalAmount();
  const deliveryCharge = 300;
  const pickupCharge = 0;
  const deliveryFee = deliveryType === 'delivery' ? deliveryCharge : pickupCharge;
  const subtotal = totalAmount;
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 && (
        <p className="text-red-500 mb-4">Your cart is empty. Please add items to your cart.</p>
      )}
      {cartItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center">
            <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
            <div>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-bold">
                {getPriceForCurrency(item.price * item.quantity, selectedCurrency)}
              </p>
              <p className='text-[black]'>{item.selectedSize}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(index, false)}
                  className="bg-gray-800 text-white px-2 py-1 rounded-lg"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, true)}
                  className="bg-gray-800 text-white px-2 py-1 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleRemoveItem(index)}
            className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex-1 mr-4">
          <p className='text-[16px] font-[700]'>Have a coupon?</p>
          <p className='text-[13px]'>Add your coupon code to get discount</p>
          <div className="flex">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full p-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
              onClick={applyCoupon}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
          {couponMessage && <p className="mt-2 text-red-500">{couponMessage}</p>}
        </div>
        <div className="flex-1 border border-gray-300 rounded-[10px] p-4">
          <p className='text-[20px] py-5 font-[700]'>Cart Summary</p>
          <div className="flex flex-col mb-4">
            <button
              onClick={() => setDeliveryType('delivery')}
              className={`p-4 mb-2 text-lg flex justify-between font-semibold ${deliveryType === 'delivery' ? 'border border-red-500' : 'border border-gray-300'} rounded-lg`}
            >
              <span>
                Delivery 
              </span>
              <span>
                {getPriceForCurrency(deliveryCharge, selectedCurrency)}
              </span>
            </button>
            <button
              onClick={() => setDeliveryType('pickup')}
              className={`p-4 text-lg flex justify-between font-semibold ${deliveryType === 'pickup' ? 'border border-red-500' : 'border border-gray-300'} rounded-lg`}
            >
              <span>
                Pickup 
              </span>
              <span>
                {getPriceForCurrency(pickupCharge, selectedCurrency)}
              </span>
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between mb-2">
            <p className="text-lg font-semibold">Subtotal:</p>
            <p className="text-lg">{getPriceForCurrency(subtotal, selectedCurrency)}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold">{getPriceForCurrency(total, selectedCurrency)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
