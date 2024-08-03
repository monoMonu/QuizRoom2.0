import Statistic from '../models/Statistics.model.js'
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
      },
      { new: true }
   )

   return res
   .status(200)
   .json(
      new ApiResponse(200, statistics, 'Updated Statistics succesfully')
   )
})

// Update number of plays
const updatePlays = asyncHandler(async (req, res) =>{

   const statistics = await Statistic.findOneAndUpdate(
      { player: req.user?._id },
      {
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

// Get paginated leaderboard entries
const fetchLeaderboard = asyncHandler (async (req, res) => {
   const { page = 1, limit = 10 } = req.query;

   // Aggregation pipeline to join Stats with User and sort by score
   const leaders = await Statistic.aggregate([
      { $sort: { highScore: -1 } },
      { $skip: (page -1)*limit },
      { $limit: parseInt(limit) },
      {
         $lookup: {
            from: 'users',
            localField: 'player',
            foreignField: '_id',
            as: 'user'
         }
      },
      { $unwind: '$user' },
      {
         $project: {
            _id: 0,
            fullname: '$user.fullname',
            username: '$user.username',
            highScore: 1,
            avatar: '$user.avatar'
         }
      }

   ]);
   
   const totalEntries = await Statistic.countDocuments();

   return res
   .status(200)
   .json(
      new ApiResponse(
         200,
         {
            totalEntries,
            totalPages: Math.ceil(totalEntries / limit),
            currentPage: parseInt(page),
            data: leaders
         },
         "Leaderboard data fetched succesfully."
      )
   );
});



export {getStats, setStats, updatePlays, fetchLeaderboard}