
const mongoose = require('mongoose');

const connect =()=>{ 
    mongoose.connect("mongodb://localhost:27017/metadata", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))
}
module.exports = connect;