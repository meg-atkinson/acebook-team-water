const Prod = require('../models/prod');

// Send a prod
async function sendProd(req, res) {
    try {
        const fromUser = req.user_id; // from logged-in user
        const { toUser } = req.body;

        const existingProdFromMe = await Prod.findOne({ fromUser, toUser });

        if (existingProdFromMe) {
        // Check if the other person has prodded back since my last prod
        const prodBackFromThem = await Prod.findOne({ 
            fromUser: toUser, 
            toUser: fromUser,
            createdAt: { $gt: existingProdFromMe.createdAt } // After my prod
            });
        
            if (!prodBackFromThem) {
                return res.status(400).json({ 
                message: 'You can only send one prod until they prod you back!' 
                });
            }
        }   

        // Optional: add logic to prevent self-prods, duplicates, cooldowns here

        const newProd = new Prod({ fromUser, toUser });
        await newProd.save();

        res.status(201).json({ message: 'Prod sent!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send prod', error: error.message });
    }
}

// Get received prods
async function getReceivedProds(req, res) {
    try {
        const toUser = req.user_id;
        const prods = await Prod.find({ toUser })
        .populate('fromUser', 'basicInfo photos.profilePicture')
        .sort({ createdAt: -1 });

        res.status(200).json({ prods });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get prods', error: error.message });
    }
}


module.exports = {
    sendProd,
    getReceivedProds
};