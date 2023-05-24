const mongoose=require('mongoose')

const restaurantSchema=new mongoose.Schema({

    name_of_restaurant:{
        type:String,
        required:true
    },
    description_of_restaurant:{
        type:String,
        required:false
    },
    location_of_restaurant:{
        latitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        }
    },
    ratings:{
        type:[Number],
        required:false

    }

})

module.exports=mongoose.model('Restaurant',restaurantSchema)