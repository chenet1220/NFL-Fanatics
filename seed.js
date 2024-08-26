(async function() {

    require("dotenv").config();
    const mongoose = require("mongoose");
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    });

    const Team = require("./models/team");

    const teams = [
        {name: "Buffalo Bills", division: "AFC East", record: "W-0 L-0"},
        {name: "Miami Dolphins", division: "AFC East", record: "W-0 L-0"},
        {name: "New England Patriots", division: "AFC East", record: "W-0 L-0"},
        {name: "New York Jets", division: "AFC East", record: "W-0 L-0"},
        {name: "Pittsburgh Steelers", division: "AFC North", record: "W-0 L-0"},
        {name: "Baltimore Ravens", division: "AFC North", record: "W-0 L-0"},
        {name: "Cincinnati Bengals", division: "AFC North", record: "W-0 L-0"},
        {name: "Cleveland Browns", division: "AFC North", record: "W-0 L-0"},
        {name: "Houston Texans", division: "AFC South", record: "W-0 L-0"},
        {name: "Indianapolis Colts", division: "AFC South", record: "W-0 L-0"},
        {name: "Jacksonville Jaguars", division: "AFC South", record: "W-0 L-0"},
        {name: "Tennesse Titans", division: "AFC South", record: "W-0 L-0"},
        {name: "Kansas City Cheifs", division: "AFC WEST", record: "W-0 L-0"},
        {name: "Las Vegas Raiders", division: "AFC WEST", record: "W-0 L-0"},
        {name: "Los Angeles Chargers", division: "AFC WEST", record: "W-0 L-0"},
        {name: "Denver Broncos", division: "AFC WEST", record: "W-0 L-0"},
        {name: "Washington Commanders", division: "NFC East", record: "W-0 L-0"},
        {name: "New York Giants", division: "NFC East", record: "W-0 L-0"},
        {name: "Dallas Cowboys", division: "NFC East", record: "W-0 L-0"},
        {name: "Philadelphia Eagles", division: "NFC East", record: "W-0 L-0"},
        {name: "Detriot Lions", division: "NFC North", record: "W-0 L-0"},
        {name: "Green Bay Packers", division: "NFC North", record: "W-0 L-0"},
        {name: "Minnesota Vikings", division: "NFC North", record: "W-0 L-0"},
        {name: "Chicago Bears", division: "NFC North", record: "W-0 L-0"},
        {name: "Tampa Bay Buccaneers", division: "NFC South", record: "W-0 L-0"},
        {name: "Alanta Falcons", division: "NFC South", record: "W-0 L-0"},
        {name: "Carolina Panthers", division: "NFC South", record: "W-0 L-0"},
        {name: "New Orleans Saints", division: "NFC South", record: "W-0 L-0"},
        {name: "San Francisco 49ers", division: "NFC West", record: "W-0 L-0"},
        {name: "Seattle Seahawks", division: "NFC West", record: "W-0 L-0"},
        {name: "Arizona Cardinals", division: "NFC West", record: "W-0 L-0"},
        {name: "Los Angeles", division: "NFC West", record: "W-0 L-0"},
    ];

    await Team.deleteMany({});
    const newTeams = await Team.create(teams);
    console.log(newTeams)

    process.exit();


})();