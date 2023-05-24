const restaurantModel=require('./../models/restaurantModel')


const addRestaurant= async (req,res)=>{
    try{
        
        const data=req.body;
        console.log(data)
        
        const addaRestaurant=await restaurantModel.create(data)
        //console.log(addaRestaurant)
        return res.status(200).json(addaRestaurant)
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
}

module.exports={
    addRestaurant
}