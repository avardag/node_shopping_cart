var mongoose = require("mongoose");

var Product = require("../models/product");
//Mongoose setup
mongoose.connect("mongodb://localhost:27017/shopping_node", {useNewUrlParser: true});

var products = [
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/7JPZ4vWJNZbLhbekpAUvMd-650-80.jpg',
    title: "Rainbow Six Siege",
    description: "Counter-Strike's sexier cousin. Siege might lack the sharp hit detection and purity of CS:GO, but it's a more accessible and modern FPS that rewards clever timing and coordinated teamwork as much as aim. Siege's learning curve is a result of all the stuff (characters, gadgets, elaborate maps, and guns) that's been added since December 2015.",
    price: 18
  }),
  new Product({
    imagePath: "https://cdn.mos.cms.futurecdn.net/2tQwy2gEsnLtmJfZtNoymY-650-80.jpg",
    title: "Fortnite Battle Royale",
    description: "What started as a sterile PUBG imitation has evolved into the Minecraft generation’s arena shooter. Fortnite’s building system rewards good aim and an eye for architecture equally, extending battle royale shootouts from green pastures to impromptu skyscrapers slapped together in a minute.",
    price: 29
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/t3iX3o2552asFXFqmkjgDZ-650-80.jpg',
    title: "Overwatch",
    description: "With Overwatch's colorful characters and bright, inclusive world, Blizzard brought the world of team-based hero shooters to an entirely new market. Teams of six take the roles of tank, DPS, and healer to battle over objectives, not just who can get the most kills.",
    price: 40
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/p5xpJzmH4NSNFvSbxbFLEP-650-80.jpg',
    title: "PlayerUnknown's Battlegrounds",
    description: "100 murderous hopefuls skydive onto an abandoned island, grab whatever weapons and ammo they can find, and fight to the death. Rinse and repeat. Though the concept wasn't new (PlayerUnknown himself is responsible for multiple battle royale modes and mods), PUBG made the battle royale genre into the phenomenon that it is today.",
    price: 36
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/aDbfB32RFosMfec2cDnBiW-650-80.jpg',
    title: "Rocket League",
    description: "The best and only synthesis of hockey and soccer than you can play with rocket-powered battle cars. Where most esports rely on gunplay or clicky top-down wizardry, Rocket League is all physics and speed. Simply put, you're trying to smash a giant soccer ball into a goal with a car. But the cars can jump, and flip, and fly into the air once you get the hang of it (which will take a while). ",
    price: 43
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/tBWwfiXbRHYgM7TvduewU5-650-80.jpg',
    title: "Hearthstone",
    description: "Despite the recent departure of game director Ben Brode, he of the flannel shirt and megaton laughter, Hearthstone nonetheless finds itself in good health right now. The release of The Witchwood expansion in April, combined with the annual rotation of the Standard format, means that this is a great time to dip into Blizzard's collectible card game.",
    price: 32
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/HWqH72a34wFqPLkeBXJQt6-650-80.jpg',
    title: "League of Legends",
    description: "MOBAs are hard, rewarding competitive games because they demand teamwork, quick reaction times, and knowledge of beginning, middle, and endgame phases that vary with the role you play. And if you're going to play one, LoL is the best place to start. League of Legends has had remarkable staying power as one of the most popular games in esports for a couple simple reasons.",
    price: 24
  }),
  new Product({
    imagePath: 'https://cdn.mos.cms.futurecdn.net/tLpnUfYfErmi9ZUBmkTR5b-650-80.jpg',
    title: "Battlefield 1",
    description: "The World War 1 setting let DICE cut down on the vast customisation offered by Battlefield 4, resulting in a tighter, more action-oriented shooter that still features all of the spectacle the series is known for.",
    price: 20
  }),
]

let done = 0
for (let i = 0; i < products.length; i++) {
  products[i].save((err)=>{
    if (err) {
      console.log('err', err);
    }
    done++;
    if (done === products.length) {
      exitFn()
    }
  });
  
}

function exitFn() {
  mongoose.disconnect()
}