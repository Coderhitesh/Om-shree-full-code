import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const OrderHistory = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of orders per page

    const handleFetchOrder = async () => {
        const userId = user?._id;
        try {
            const { data } = await axios.get(`http://localhost:7000/api/v1/getMyOrderOnly/?id=${userId}`);
            const reverse = data.orders
            setOrders(reverse.reverse() || []); // Fallback to empty array if no orders
        } catch (error) {
            console.error("Internal server error:", error);
        }
    };

    useEffect(() => {
        handleFetchOrder();
    }, []);

    // Calculate the orders to display on the current page
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
                <h4 className="mb-0">Order History</h4>
            </div>
            <div className="card-body">
                {orders && orders.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th style={{whiteSpace:'nowrap'}}>Order ID</th>
                                        <th style={{whiteSpace:'nowrap'}}>Date</th>
                                        <th style={{whiteSpace:'nowrap'}}>Product</th>
                                        <th style={{whiteSpace:'nowrap'}}>Address</th>
                                        <th style={{whiteSpace:'nowrap'}}>Total</th>
                                        <th style={{whiteSpace:'nowrap'}}>Payment Mode</th>
                                        <th style={{whiteSpace:'nowrap'}}>Payment status</th>
                                        <th style={{whiteSpace:'nowrap'}}>Delivery status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order) => (
                                        <tr key={order._id}>
                                            <td>#{order._id}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {order?.items && order?.items.length > 0 ? (
                                                    order.items.map((item, index) => (
                                                        <p key={index}>
                                                            {item?.productId?.name || 'Unknown Product'}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <span>No products</span>
                                                )}
                                            </td>

                                            <td>{`${order.HouseNo}, ${order.Street}, ${order.City}, (${order.PinCode})`}</td>
                                            <td>₹{order.finalMainPrice.toFixed(2)}</td>
                                            <td>{order.paymentMode}</td>
                                            <td>{order.PaymentStatus}</td>
                                            <td>
                                                <span className={`badge bg-${order.OrderStatus === 'Delivered' ? 'success' : 'warning'}`}>
                                                    {order.OrderStatus === 'Processing' && <FontAwesomeIcon icon={faSpinner} spin className="me-1" />}
                                                    {order.OrderStatus === 'Delivered' && <FontAwesomeIcon icon={faBox} className="me-1" />}
                                                    {order.OrderStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button style={{backgroundColor:'#28834C',borderColor:'white',color:'white'}} className="page-link" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </>
                ) : (
                    <div className="text-center py-5">
                        <FontAwesomeIcon icon={faBox} size="3x" className="text-muted mb-3" />
                        <h5>No orders yet</h5>
                        <p className="text-muted">Your order history will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
