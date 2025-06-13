const { connectToDatabase } = require('../db/db')
const mongoose = require('mongoose')
const User = require("../models/user.js")
const Post = require("../models/post.js")
const userData = require('../data/userData.js')
const postData = require('../data/postData.js')
const dotenv = require('dotenv')


dotenv.config()



const importData = async () => {
    try {
        await User.deleteMany()

        const createdUsers = await User.insertMany(userData)

        const user1Id = createdUsers[0]._id
        const user2Id = createdUsers[1]._id
        const user3Id = createdUsers[2]._id
        const user4Id = createdUsers[3]._id
        const user5Id = createdUsers[4]._id

        const userIds = [user1Id, user2Id, user3Id, user4Id, user5Id];

        const imagesPerUser = {
            [user1Id]: [],
            [user2Id]: [],
            [user3Id]: [],
            [user4Id]: [],
            [user5Id]: [],
        };

        await User.findByIdAndUpdate(user1Id, { $addToSet: {friends: { $each: [user2Id, user3Id, user4Id, user5Id]}} });
        await User.findByIdAndUpdate(user2Id, { $addToSet: {friends: { $each: [user1Id, user3Id, user4Id, user5Id]}} });
        await User.findByIdAndUpdate(user3Id, { $addToSet: {friends: { $each: [user1Id, user2Id, user4Id]}} }); // not 5
        await User.findByIdAndUpdate(user4Id, { $addToSet: {friends: { $each: [user1Id, user2Id, user3Id]}} }); // not 5
        await User.findByIdAndUpdate(user5Id, { $addToSet: {friends: { $each: [user1Id, user2Id]}} });

        // const updatedPosts = postData.map((post,i) => {
        //     return {
        //         ...post,
        //         userID: i % 2 === 0 ? user1Id : user2Id,
        //         targetUserID: i % 2 === 0 ? user2Id : user1Id,
        //     }
        // })
        const updatedPosts = postData.map((post, i) => {
            const posterIndex = i % userIds.length;
            const userID = userIds[posterIndex];
    
            // Even posts: poster posts on own wall
            // Odd posts: poster posts on next user's wall (wrap around)
            let targetUserID;
            if (i % 2 === 0) {
                targetUserID = userID;
            } else {
                const nextIndex = (posterIndex + 1) % userIds.length;
                targetUserID = userIds[nextIndex];
            }

            if (post.imagePath) {
                imagesPerUser[userID].push(post.imagePath);
            }

            return {
                ...post,
                userID,
                targetUserID
            };
        });

        // Now update each user with their photos.otherPhotos array
        const updateUserPromises = userIds.map((uid) => {
            return User.findByIdAndUpdate(uid, {
                $set: { 'photos.otherPhotos': imagesPerUser[uid] }
            });
        });

        await Promise.all(updateUserPromises);

        await Post.insertMany(updatedPosts)
    
        console.log('Data Imported!')
        process.exit()
        } catch (error) {
            console.error(`${error}`)
            process.exit(1)
        }
}


const destroyData = async () => {
    try {
        await User.deleteMany()
        await Post.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const run = async () =>{
await connectToDatabase();

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}
}

run();

// TO DESTROY SEED DATA npm run data:destroy -d
// TO SEED DATA  npm run data:import