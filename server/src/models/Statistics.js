import { Schema, model } from 'mongoose'

const statisticsSchema = new Schema({
   player: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   highScore: {
      type: Number,
      default: 0
   },
   quizesPlayed: {
      type: Number,
      default: 0
   }
},
   {
      timestamps: true
   }
)

const Statistic = model('Statistic', statisticsSchema);
export default Statistic;