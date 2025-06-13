import { useState } from 'react';
import './ProdButton.css';
import prodIcon from '../../assets/prod.png'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ProdButton = ({ toUserId }) => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleProd = async () => {
        console.log("Prod button clicked");
        console.log("toUserId in ProdButton:", toUserId);
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
        <button 
            className={`prod-button ${sent ? 'sent' : ''}`}
            onClick={handleProd} 
            disabled={loading || sent}>
        <img
            src={prodIcon}
            alt={sent ? 'Prod sent' : 'Send prod'}
            className="prod-icon"
        />
        </button>
    );
};