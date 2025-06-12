import { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ProdButton = ({ toUserId }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleProd = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
        const response = await fetch(`${BACKEND_URL}/prods`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ toUser: toUserId })
        });
        if (!response.ok) throw new Error('Failed to send prod');
        setSent(true);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <button onClick={handleProd} disabled={loading || sent}>
        {sent ? 'Prod Sent' : 'Prod'}
        </button>
    );
};