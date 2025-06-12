import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Prods = ({ showProds }) => {
    const [prods, setProds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProds = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
    
        try {
        const response = await fetch(`${BACKEND_URL}/prods/received`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch prods');
        }

        const data = await response.json();
        setProds(data.prods);
        } catch (err) {
        setError(err.message);
        console.error('Error fetching prods:', err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (showProds) {
        fetchProds();
        }
    }, [showProds]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (!showProds) {
        return null;
    }

    return (
        <div className="prodsContainer">
        <h3>Your Prods</h3>
        {/* <button onClick={fetchProds}>Refresh</button> */}

        {loading && <p>Loading prods...</p>}

        {error && (
            <div>
            <p>Error: {error}</p>
            <button onClick={fetchProds}>Try Again</button>
            </div>
        )}

        {!loading && !error && (
            <div>
            {prods.length === 0 ? (
                <p>No prods yet!</p>
            ) : (
                <div>
                {prods.map((prod) => (
                    <div key={`${prod.from._id}-${prod.createdAt}`}>
                    <p>
                        {prod.from.basicInfo?.firstName || 'Someone'} prodded you!
                        - {formatDate(prod.createdAt)}
                    </p>
                    </div>
                ))}
                </div>
            )}
            </div>
        )}
        </div>
    );
};