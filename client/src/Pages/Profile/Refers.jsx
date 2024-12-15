import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

function Refers() {
    const token = sessionStorage.getItem('authToken');
    const [user, setUser] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleFetchUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:7000/api/v1/user-details', {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the headers
                },
            });
            setUser(data?.user);
            // Assuming the data contains pagination details
            setTotalPages(data?.totalPages || 1);
        } catch (error) {
            console.log("Internal server error", error);
        }
    };

    useEffect(() => {
        handleFetchUser();
    }, [currentPage]); // Trigger refetch when page changes

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
                <h4 className="mb-0">Refers</h4>
            </div>
            <div className="card-body">
                {user.referralStatus && user.referralStatus.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mobile Number</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.referralStatus.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order.MobileNumber}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" style={{backgroundColor:'#28834C',borderColor:'white',color:'white'}} onClick={() => paginate(index + 1)}>
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
                        <h5>No referrals yet</h5>
                        <p className="text-muted">Your referral history will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Refers;
