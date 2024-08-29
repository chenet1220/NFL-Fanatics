(async function() {

    require("dotenv").config();
    const mongoose = require("mongoose");
    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    });

    const Team = require("./models/team");

    const teams = [
        {name: "Buffalo Bills", division: "AFC East", record: "W-0 L-0", imagePath: "/images/buf.png"},
        {name: "Miami Dolphins", division: "AFC East", record: "W-0 L-0", imagePath: "/images/miami.png"},
        {name: "New England Patriots", division: "AFC East", record: "W-0 L-0", imagePath: "/images/ne.png"},
        {name: "New York Jets", division: "AFC East", record: "W-0 L-0", imagePath: "/images/jets.png"},
        {name: "Pittsburgh Steelers", division: "AFC North", record: "W-0 L-0", imagePath: "/images/pitt.png"},
        {name: "Baltimore Ravens", division: "AFC North", record: "W-0 L-0", imagePath: "/images/ravens.png"},
        {name: "Cincinnati Bengals", division: "AFC North", record: "W-0 L-0", imagePath: "/images/cinci.png"},
        {name: "Cleveland Browns", division: "AFC North", record: "W-0 L-0", imagePath: "/images/browns.png"},
        {name: "Houston Texans", division: "AFC South", record: "W-0 L-0", imagePath: "/images/texans.png"},
        {name: "Indianapolis Colts", division: "AFC South", record: "W-0 L-0", imagePath: "/images/colts.png"},
        {name: "Jacksonville Jaguars", division: "AFC South", record: "W-0 L-0", imagePath: "/images/jax.png"},
        {name: "Tennesse Titans", division: "AFC South", record: "W-0 L-0", imagePath: "/images/tenn.png"},
        {name: "Kansas City Cheifs", division: "AFC West", record: "W-0 L-0", imagePath: "/images/kc.png"},
        {name: "Las Vegas Raiders", division: "AFC West", record: "W-0 L-0", imagePath: "/images/oak.png"},
        {name: "Los Angeles Chargers", division: "AFC West", record: "W-0 L-0", imagePath: "/images/chargers.png"},
        {name: "Denver Broncos", division: "AFC West", record: "W-0 L-0", imagePath: "/images/denver.png"},
        {name: "Washington Commanders", division: "NFC East", record: "W-0 L-0", imagePath: "/images/wash.png"},
        {name: "New York Giants", division: "NFC East", record: "W-0 L-0", imagePath: "/images/giants.png"},
        {name: "Dallas Cowboys", division: "NFC East", record: "W-0 L-0", imagePath: "/images/dallas.png"},
        {name: "Philadelphia Eagles", division: "NFC East", record: "W-0 L-0", imagePath: "/images/phili.png" },
        {name: "Detriot Lions", division: "NFC North", record: "W-0 L-0", imagePath: "/images/lions.png"},
        {name: "Green Bay Packers", division: "NFC North", record: "W-0 L-0", imagePath: "/images/gb.png"},
        {name: "Minnesota Vikings", division: "NFC North", record: "W-0 L-0", imagePath: "/images/minn.png"},
        {name: "Chicago Bears", division: "NFC North", record: "W-0 L-0", imagePath: "/images/bears.png"},
        {name: "Tampa Bay Buccaneers", division: "NFC South", record: "W-0 L-0", imagePath: "/images/tampa.png"},
        {name: "Alanta Falcons", division: "NFC South", record: "W-0 L-0", imagePath: "/images/falcons.png"},
        {name: "Carolina Panthers", division: "NFC South", record: "W-0 L-0", imagePath: "/images/panthers.png"},
        {name: "New Orleans Saints", division: "NFC South", record: "W-0 L-0", imagePath: "/images/no.png"},
        {name: "San Francisco 49ers", division: "NFC West", record: "W-0 L-0", imagePath: "/images/sf.png"},
        {name: "Seattle Seahawks", division: "NFC West", record: "W-0 L-0", imagePath: "/images/sea.png"},
        {name: "Arizona Cardinals", division: "NFC West", record: "W-0 L-0", imagePath: "/images/ariz.png"},
        {name: "Los Angeles Rams", division: "NFC West", record: "W-0 L-0", imagePath: "/images/rams.png"},
    ];

    await Team.deleteMany({});
    const newTeams = await Team.create(teams);
    console.log(newTeams)

    process.exit();


})();