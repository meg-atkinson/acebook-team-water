const bcrypt = require('bcrypt')
// const { FriendRequests } = require('../../frontend/src/components/friends/FriendRequests')


const users = [
    { 
    email: "eve@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Eve",
        lastName: "Lol",
        pronouns: "she/her",
        birthday: "01/01/2000",
        homeTown: "Huddersfield"
    },
    otherInfo: {
        interests: "Yoga, calligraphy, and puzzle games",
        music: "Lo-fi, R&B, classical piano",
        food: "Sushi, ramen, and fresh smoothies",
        tvShows: "The Queen's Gambit, Brooklyn Nine-Nine, The Good Place",
        movies: "Pride & Prejudice, Spirited Away, La La Land",
        quote: "Happiness is not something ready made. It comes from your own actions."
    },
    photos: {
        profilePicture: "uploads/images/1F471-200D-2640-FE0F_color.png",
        otherPhotos: []
    },
    friends: [],
    friendRequests: [],
    prods: []
},
    { 
    email: "george@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "George",
        lastName: "Geo",
        pronouns: "he/him",
        birthday: "02/02/2001",
        homeTown: "York"
    },
    otherInfo: {
        interests: "Hiking, photography, and volunteering",
        music: "Indie rock, acoustic, and folk",
        food: "Thai food and homemade pasta",
        tvShows: "Stranger Things, Planet Earth, The Bear",
        movies: "Into the Wild, Her, Arrival",
        quote: "Do not go where the path may lead, go instead where there is no path and leave a trail."
    },
    photos: {
        profilePicture: "uploads/images/1F468-200D-1F4BB_color.png",
        otherPhotos: []
    },
    friends: [],
    friendRequests: [],
    prods: []
},
{ 
    email: "sarah@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Sarah",
        lastName: "Sa",
        pronouns: "she/her",
        birthday: "03/03/2002",
        homeTown: "Glasgow"
    },
    otherInfo: {
        interests: "Poetry, oil painting, astrology",
        music: "Neo-soul, ambient jazz, acoustic covers",
        food: "Ethiopian injera, herbal teas, dark chocolate",
        tvShows: "The OA, Midnight Gospel, Anne with an E",
        movies: "Moonlight, Portrait of a Lady on Fire, The Tree of Life",
        quote: "In the quiet, I find my loudest truth."
    },
    photos: {
        profilePicture: "uploads/images/1F469-200D-1F3ED_color.png",
        otherPhotos: []
    },
    friends: [],
    friendRequests: [],
    prods: []
},
{ 
    email: "olly@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Olly",
        lastName: "Waldo",
        pronouns: "he/him",
        birthday: "01/03/1999",
        homeTown: "London"
    },
    otherInfo: {
        interests: "Birdwatching, chess, mountain biking",
        music: "Ambient instrumental, blues, bluegrass",
        food: "Grilled trout, lentil soup, sourdough bread",
        tvShows: "Sherlock, Alone, NOVA",
        movies: "The Revenant, A Beautiful Mind, The Secret Life of Walter Mitty",
        quote: "A mind that is stretched by a new experience can never go back to its old dimensions."
    },
    photos: {
        profilePicture: "uploads/images/1F64B-200D-2642-FE0F_color.png",
        otherPhotos: []
    },
    friends: [],
    friendRequests: [],
    prods: []

},
{ 
    email: "megan@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Megan",
        lastName: "Me",
        pronouns: "she/her",
        birthday: "03/03/2002",
        homeTown: "Huddersfield"
    },
    otherInfo: {
        interests: "Dancing, event planning, travel vlogging",
        music: "Top 40, reggaeton, dance-pop",
        food: "Tacos, cupcakes, matcha lattes",
        tvShows: "Emily in Paris, Love Is Blind, The Circle",
        movies: "Legally Blonde, Mean Girls, Crazy Rich Asians",
        quote: "Life’s too short to wear boring shoes."
},
    photos: {
        profilePicture: "uploads/images/1F469_color.png",
        otherPhotos: []
    },
    friends: [],
    friendRequests: [],
    prods: []
}


]


module.exports = users