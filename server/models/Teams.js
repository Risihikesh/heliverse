const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    team_description: { type: String, required: false },
    team_members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true }
);

const Teams= mongoose.model("Teams", TeamsSchema);
module.exports= Teams;