import Statistic from '../models/Statistics.js'
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';

// Getting high score
const getStats = asyncHandler(async (req, res) => {
   const statistics = await Statistic.findOne({player: req.user?._id});
   // If no stats found in the database create a new one with default values
   if(!statistics){
      const newStats = await Statistic.create({
         player: req.user?._id
      })
      return res
      .status(200)
      .json(
         new ApiResponse(200, newStats, "Succesfully fetched ststistics")
      )
   }else{
      return res
      .status(200)
      .json(
         new ApiResponse(200, statistics, "Succesfully fetched ststistics")
      )
   }
})

// Storing score to db
const setStats = asyncHandler(async (req, res) =>{
   const {score} = req.body;

   const statistics = await Statistic.findOneAndUpdate(
      { player: req.user?._id },
      { 
         $max: { highScore: score },
         $inc: { quizesPlayed: 1 } // increments quizesPlayed by 1
      },
      { new: true }
   )

   return res
   .status(200)
   .json(
      new ApiResponse(200, statistics, 'Updated Statistics succesfully')
   )
})



export {getStats, setStats}