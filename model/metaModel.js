const  mongoose = require ("mongoose");


const metaSchema = new mongoose.Schema({
    name:{
        type :String,
    },
   type:{
    type:String
    },
    extention:{
        type:String
    },
    },{
        timestamps:true
    })

module.exports = mongoose.model("Meta",metaSchema);

