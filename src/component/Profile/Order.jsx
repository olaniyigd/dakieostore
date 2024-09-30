const orders = [
    { id: '#1002', date: '2023-10-06', amount: 150.00, status: 'Ongoing' },
    { id: '#1002', date: '2023-10-06', amount: 150.00, status: 'Ongoing' },
    { id: '#1001', date: '2023-10-05', amount: 250.00, status: 'Completed' },
    { id: '#1001', date: '2023-10-05', amount: 250.00, status: 'Completed' },
    { id: '#1001', date: '2023-10-05', amount: 250.00, status: 'Completed' },
    { id: '#1001', date: '2023-10-05', amount: 250.00, status: 'Completed' },
    // Add more orders as needed
];



export default function Order() {
    const selectedCurrency = localStorage.getItem('selectedCurrency');

    return (
        <div className="container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Order Number</th>
                        <th className="py-2 px-4 border-b text-left">Date</th>
                        <th className="py-2 px-4 border-b text-left">Amount</th>
                        <th className="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border-b">{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.date}</td>
                            <td className="py-2 px-4 border-b">{`${selectedCurrency}${order.amount.toFixed(2)}`}</td>
                            <td className={`py-2 px-4 border-b ${
                                order.status === 'Completed' ? 'text-green-500' :
                                order.status === 'Pending' ? 'text-yellow-500' :
                                'text-red-500'
                            }`}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
