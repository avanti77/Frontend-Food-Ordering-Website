const mongoose = require('mongoose');

const URI= 'mongodb+srv://MERN:dehradun@mern.is1k7ab.mongodb.net/Memories?retryWrites=true&w=majority';

// const mongoDB= async()=>{
//     await mongoose.connect(URI,{useNewUrlParser: true}, async(err,result)=>{
//         if(err)     console.log("---",err);
//         else
//         console.log("connected");
//     });

// }
const mongoDB = async () => {
    try {
      await mongoose.connect(URI, { useNewUrlParser: true });
      console.log("Connected to MongoDB");
    //   const fetched_data= await mongoose.connection.db.collection("food_items");
    //   fetched_data.find({}).toArray(function(err,data){
    //     if(err) console.log(err);
    //     else console.log(data);
    //   })
        // try {
        //     const fetched_data = await mongoose.connection.db.collection("food_items");
        //     const data = await fetched_data.find({}).toArray(async function(err,data){
        //       const foodCategory= await mongoose.connection.db.collection("foodCategory");
        //       foodCategory.find({}).toArray(function(err,catData){
        //         if(err) console.log(err);
        //         else{
        //           global.food_items= data;
        //           global.foodCategory= catData;
                  

        //         }

        //       })
        //     });
        // } catch (err) {
        //     console.error("Error fetching data:", err);
        // }
      try {
        const food_items = await mongoose.connection.db.collection("food_items").find({}).toArray();
      
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
      
        global.food_items = food_items;
        global.foodCategory = foodCategory;
      
      } catch (err) {
        console.error("Error fetching data:", err);
      }
        
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };
module.exports= mongoDB;
