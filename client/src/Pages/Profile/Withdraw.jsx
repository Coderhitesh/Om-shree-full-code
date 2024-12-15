import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

function Withdraw() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [withDraw, setWithdraw] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of orders per page

    const handleFetchWithdraw = async () => {
        try {
            const userId = user?._id;
            const { data } = await axios.get(`http://localhost:7000/api/v1/get-withdrawal/?id=${userId}`);
            const allWithdraw = data.data;
            setWithdraw(allWithdraw.reverse() || []);
        } catch (error) {
            console.log("Internal server error:", error);
        }
    };

    useEffect(() => {
        handleFetchWithdraw();
    }, []);

    // Calculate the orders to display on the current page
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = withDraw.slice(indexOfFirstOrder, indexOfLastOrder);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(withDraw.length / itemsPerPage);

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
                <h4 className="mb-0">Withdrawal History</h4>
            </div>
            <div className="card-body">
                {withDraw && withDraw.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap' }}>Order ID</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Date</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Amount</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Payment Method</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Account Details</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.receivedMethod}</td>
                                            <td>
                                                {item.paymentDetails?.bank ? (
                                                    <>
                                                        <strong>{item.paymentDetails.bank.accountHolderName}</strong> <br />
                                                        {item.paymentDetails.bank.name} - {item.paymentDetails.bank.accountNumber}<br />
                                                        IFSC: {item.paymentDetails.bank.ifscCode}
                                                    </>
                                                ) : (
                                                    <>
                                                        <strong>{item.paymentDetails.upi.name}</strong> <br />
                                                        UPI ID: {item.paymentDetails.upi.id}
                                                    </>
                                                )}
                                            </td>
                                            <td>{item.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button style={{ backgroundColor: '#28834C', borderColor: 'white', color: 'white' }} className="page-link" onClick={() => paginate(index + 1)}>
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
                        <h5>No Withdrawals Yet</h5>
                        <p className="text-muted">Your withdrawal history will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Withdraw;
