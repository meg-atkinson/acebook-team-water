const User = require('../models/user');

// Send a prod
async function sendProd(req, res) {
    try {
        const fromUserId = req.user_id; // from logged-in user
        const { toUser: toUserId } = req.body;

        // Prevent self-prods
        if (fromUserId === toUserId) {
        return res.status(400).json({ message: 'You cannot prod yourself!' });
        }

        // Get both users
        const [fromUser, toUser] = await Promise.all([
        User.findById(fromUserId),
        User.findById(toUserId)
        ]);

        if (!toUser) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Check if there's already an active prod between these users
        const existingProdToThem = toUser.prods.find(prod => 
        prod.from.toString() === fromUserId
        );
        const existingProdToMe = fromUser.prods.find(prod => 
        prod.from.toString() === toUserId
        );

        if (existingProdToThem) {
        return res.status(400).json({
            message: 'You already have an active prod with this user!'
        });
        }

        // If they have a prod to me, this is a "prod back" - remove their prod and add mine
        if (existingProdToMe) {
        // Remove their prod from my list
        fromUser.prods = fromUser.prods.filter(prod => 
            prod.from.toString() !== toUserId
        );
        await fromUser.save();
        }

        // Add new prod to the recipient's list
        toUser.prods.push({
        from: fromUserId,
        createdAt: new Date()
        });
        await toUser.save();

        res.status(201).json({ message: 'Prod sent!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send prod', error: error.message });
    }
}

    // Get received prods
    async function getReceivedProds(req, res) {
    try {
        const userId = req.user_id;
    
        const user = await User.findById(userId)
        .populate('prods.from', 'basicInfo photos.profilePicture')
        .exec();

        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Sort prods by creation date (newest first)
        const sortedProds = user.prods.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json({ prods: sortedProds });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get prods', error: error.message });
    }
}

module.exports = {
    sendProd,
    getReceivedProds
};