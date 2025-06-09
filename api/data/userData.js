const bcrypt = require('bcrypt')


const users = [
    { 
    email: "eve@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "eve",
        lastName: "lol",
        pronouns: "she/her",
        birthday: "01/01/2000",
        homeTown: "Huddersfield"
    },
    otherInfo: {
        interests: "",
        music: "",
        food: "",
        tvShows: "",
        movies: "",
        quote: ""
    },
    photos: {
        profilePicture: "uploads/images/blank-profile-picture-973460_1280.webp"
    },
    friends: []
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
        interests: "",
        music: "",
        food: "",
        tvShows: "",
        movies: "",
        quote: ""
    },
    photos: {
        profilePicture: "uploads/images/blank-profile-picture-973460_1280.webp"
    },
    friends: []
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
        interests: "",
        music: "",
        food: "",
        tvShows: "",
        movies: "",
        quote: ""
    },
    photos: {
        profilePicture: "uploads/images/blank-profile-picture-973460_1280.webp"
    },
    friends: []
},
{ 
    email: "olly@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Olly",
        lastName: "W",
        pronouns: "he/him",
        birthday: "01/03/1999",
        homeTown: "London"
    },
    otherInfo: {
        interests: "Golf",
        music: "All music",
        food: "All food",
        tvShows: "Yellowstone",
        movies: "Interstellar",
        quote: "I used to think I was indecisive. But now I'm not so sure."
    },
    photos: {
        profilePicture: "uploads/images/blank-profile-picture-973460_1280.webp"
    },
    friends: []

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
        interests: "",
        music: "",
        food: "",
        tvShows: "",
        movies: "",
        quote: ""
    },
    photos: {
        profilePicture: "uploads/images/blank-profile-picture-973460_1280.webp"
    },
    friends: []
}


]


module.exports = users