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

const getAllRestaurants=async (req,res)=>{
    try {
        const data=await restaurantModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.error('Internal Server Error')
        res.status(500).send('Internal Server Error')
    }
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

const calculateDistance=(lat1,lon1,lat2,lon2)=>{
    const R = 6371e3; // Earth's radius in meters

  const lat1Rad = degreesToRadians(lat1);
  const lon1Rad = degreesToRadians(lon1);
  const lat2Rad = degreesToRadians(lat2);
  const lon2Rad = degreesToRadians(lon2);

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
  Math.cos(lat1Rad) * Math.cos(lat2Rad) *
  Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

const distance = R * c;
return distance;
}

const restaurantsNearBy=async (req,res)=>{
    
    const {Latitude,Longitude,Radius}=req.body
    console.log(Latitude,Longitude,Radius)
    const data=await restaurantModel.find()

    const nearByRestaurants=[]
     

    data.forEach((data)=>{
       const distance=calculateDistance(Latitude,Longitude,data.location_of_restaurant.latitude,data.location_of_restaurant.longitude)

       if(distance.toFixed(2)<Radius)
       nearByRestaurants.push(data)
        
    })
    console.log(nearByRestaurants.length)
    const numberOfRestaurants=nearByRestaurants.length;
    const outputdata={count:numberOfRestaurants,list:nearByRestaurants}
    res.status(200).json(outputdata)
}

module.exports={
    addRestaurant,
    getAllRestaurants,
    restaurantsNearBy
}