const Team = require("../models/Teams.js");
const { createError } = require("../error.js");

module.exports.createTeam = async (req, res, next) => {
  try {
    const { team_name, team_description, team_members } = req.body;

    // Ensure team_members contain unique user IDs
    const uniqueMembers = new Set(team_members);

    if (uniqueMembers.size !== team_members.length) {
      return next(
        createError(400, "Duplicate user IDs found in team members.")
      );
    }

    const newTeam = new Team({
      team_name,
      team_description,
      team_members,
    });

    const savedTeam = await newTeam.save();

    return res.status(201).json({ team: savedTeam });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

module.exports.getTeams = async (req, res, next) => {
  try {
    const team = await Team.find().populate(
      "team_members",
      "first_name last_name avatar email domain available"
    );

    return res.status(200).json({ team });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};

module.exports.getTeamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate(
      "team_members",
      "full_name domain available"
    );

    if (!team) {
      return next(createError(404, "Team not found"));
    }

    return res.status(200).json({ team });
  } catch (err) {
    return next(createError(err.statusCode, err.message));
  }
};
