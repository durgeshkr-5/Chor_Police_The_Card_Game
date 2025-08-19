const  mongoose =  require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // hide password in queries unless explicitly selected
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  gameHistory: [
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
      },
      score: Number,
      role: String,
      date: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
module.exports =  User;
