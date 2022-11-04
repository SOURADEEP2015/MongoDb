const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/myFirstDataBaseUsingMongoose';

const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
    // Connection Creation and Creating a new Database
mongoose.connect(url, options)
    .then(() => console.log("Connection Successful ..."))
    .catch((err) => console.log(err));

// Schema
// A Moongose Schema defines the Structure of the Document
// default values, validators, etc...

const dbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        maxlength: 20
    },
    job: String,
    married: Boolean,
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Age should not be Negetive")

            }
        }
    },
    dob: {
        type: Date,
        default: Date.now,
        minlength: 3,
        required: true,
    }
})

// A Mongoose model is awrapper on the Mongoose Schema.
// A Moongose Schema defines the Structure of the Document
// default values, validators, etc..., Whereas a Mongoose model
// provides an interface to the database for Creating,
// Querying, Updating, Deleting records etc.
//Creating Collection
const FamilyDb = new mongoose.model("FamilyDb", dbSchema);

// Create Document
const createDocument = async() => {
    try {
        const familDocument = new FamilyDb({
            name: "Souradip Panja",
            job: "IT Associate",
            married: false,
            age: 26,
            dob: 09 / 12 / 96
        })
        const result = await FamilyDb.insertMany([
            //{
            //     name: "Soumyadip Panja",
            //     job: "POST Doc",
            //     married: false,
            //     age: 31,
            //     dob: 25 / 09 / 1987
            // }, {
            //     name: "Pratanu Patra",
            //     job: "Lab Technician",
            //     married: false,
            //     age: 24,
            //     dob: 02 / 12 / 1998
            // }, {
            //     name: "Shuvomoy Panja",
            //     job: "Medical Student",
            //     married: false,
            //     age: 23,
            //     dob: 05 / 09 / 1999
            // }, {
            //     name: "Sayantika Panja",
            //     job: "MBA",
            //     married: false,
            //     age: 25,
            //     dob: 31 / 12 / 1995
            // }, {
            //     name: "Samir Kumar Panja",
            //     job: "Business Man",
            //     married: true,
            //     age: 52,
            //     dob: 01 / 01 / 1965
            // }, {
            //     name: "Rina Panja",
            //     job: "LIC Agent",
            //     married: true,
            //     age: 47,
            //     dob: 02 / 04 / 1973
            // }, {
            //     name: "Dilip Kumar Panja",
            //     job: "Retired",
            //     married: true,
            //     age: 56,
            //     dob: 12 / 06 / 1963
            // }, {
            //     name: "Rupa Panja",
            //     job: "GNM Nurse",
            //     married: true,
            //     age: 50,
            //     dob: 22 / 06 / 1971
            // }, 
            // {
            //     name: "Pradip Patra",
            //     job: "Business Man",
            //     married: true,
            //     age: 56,
            //     dob: 14 / 02 / 1975
            // }
            {
                name: "Disha Panja",
                job: "Student",
                married: true,
                age: 19,
                dob: 22 / 03 / 2004
            }
        ])
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
createDocument();

//Read Document with Query

const getDocument = async() => {
    try {
        const queryIn = await FamilyDb.find({
            age: {
                $in: [24, 26]
            }
        })
        console.log("Query Results", queryIn)
        const result = await FamilyDb.find({
            age: {
                $lt: 30
            }
        }).select({
            name: 1
        }).limit(4);
        console.log(result)
            // result.map((value) => {
            //     console.log(value.name)
            // })
    } catch (err) {
        console.log(err)
    }

}

// getDocument();

//get Dcument With Query and Count and Sorting

const getDocumentWithQueary = async() => {
    try {
        const resultsCount = await FamilyDb.
        find({
            $or: [{
                age: 26
            }, {
                name: "Soumyadip Panja"
            }]
        }).
        count()
            //console.log("Your Query Count", resultsCount)
        const resultWithSort = await FamilyDb.find({
                age: {
                    $lt: 50
                }
            }).select({
                age: 1
            }).sort({
                age: -1
            })
            //console.log("Your Sorted Query", resultWithSort)
    } catch (err) {
        console.log(err)
    }
}

//getDocumentWithQueary()

//Updating Documents

const getUpdate = async() => {
    try {
        await FamilyDb.updateMany({
            married: false
        }, {
            $set: {
                age: 25
            }
        })
    } catch (err) {
        console.log(err)
    }
}

// getUpdate()

//Delete One Document

const deleteDocument = async(_id) => {
    try {
        //const deleteDocument = await FamilyDb.deleteOne({ _id })
        const deleteDocument = await FamilyDb.findByIdAndDelete({ _id })
        console.log(deleteDocument);
    } catch (err) {
        console.log(err)
    }
}

//deleteDocument("6364adf7f897000facf9a345")