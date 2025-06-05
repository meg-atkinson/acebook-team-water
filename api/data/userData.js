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
    }
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
    }
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
    }
},
{ 
    email: "olly@me.com",
    password: bcrypt.hashSync('password', 10),
    basicInfo: {
        firstName: "Olly",
        lastName: "Ol",
        pronouns: "he/him",
        birthday: "03/03/2002",
        homeTown: "Manchester"
    }
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
    }
}


]


module.exports = users