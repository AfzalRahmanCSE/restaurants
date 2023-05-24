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

function calculateAverage(array) {
    if (array.length === 0) {
      return 0;
    }
  
    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue);
    const average = sum / array.length;
    return average;
  }

const restaurantsNearBy=async (req,res)=>{
    
    const {Latitude,Longitude,Radius}=req.body
    const data=await restaurantModel.find()

    const nearByRestaurants=[]
     

    data.forEach((data1)=>{
       const distance=calculateDistance(Latitude,Longitude,data1.location_of_restaurant.latitude,data1.location_of_restaurant.longitude)
       const data={...data1._doc}
       
       if(data.ratings.length>0){
            data.noOfRatings=data.ratings.length
           data.avgRating=calculateAverage(data.ratings)
        }
        else{
            data.noOfRatings=0;
            data.avgRating='Be The First one to Rate'
        }
       
       if(distance.toFixed(2)<Radius)
       nearByRestaurants.push(data)
       delete data.ratings
       
        
    })
    const numberOfRestaurants=nearByRestaurants.length;
    const outputdata={count:numberOfRestaurants,list:nearByRestaurants}
    res.status(200).json(outputdata)
}
const addRating=async (req,res)=>{
    const {rating}=req.body;
    const restaurantId=req.params.restaurantId;

    const data= await restaurantModel.findOne({_id:restaurantId})
    data.ratings.push(rating)

    const revisedData=await restaurantModel.updateOne({_id:restaurantId},{$set:data})
    res.status(200).send('Thanks for rating')

}

module.exports={
    addRestaurant,
    getAllRestaurants,
    restaurantsNearBy,
    addRating
}