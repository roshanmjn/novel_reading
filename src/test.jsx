import { Router } from "express";
import { HttpException } from "./errors/index.js";
import * as dotenv from "dotenv";
dotenv.config();
const router = Router();
import mysql from "mysql2/promise";
import catchAsync from "./utils/catchAsync.js";
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;

const sql = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});
router.post("/", async (req, res) => {
    const novels = [
        "astral-pet-store",
        "beastmaster-of-the-ages-novel",
        "blood-warlock-succubus-partner-in-the-apocalypse-novel",
        "chaotic-sword-god",
        "cultivation-chat-group",
        "cultivation-online-novel",
        "death-and-me",
        "dimensional-descent",
        "divine-emperor-of-death",
        "emperors-domination",
        "fey-evolution-merchant",
        "god-emperor",
        "god-of-fishing",
        "godly-empress-doctor",
        "godly-stay-home-dad",
        "i-was-caught-up-in-a-hero-summoning-but-that-world-is-at-peace",
        "infinite-mana-in-the-apocalypse",
        "invincible-novel",
        "journey-to-become-a-true-god",
        "legend-of-swordsman",
        "madams-identities-shocks-the-entire-city-again",
        "martial-god-asura-novel",
        "martial-peak",
        "mechanical-god-emperor",
        "mesmerizing-ghost-doctor",
        "monster-integration",
        "my-crown-prince-consort-is-a-firecracker",
        "my-vampire-system",
        "necropolis-immortal",
        "nine-star-hegemon-body-arts",
        "one-birth-two-treasures-the-billionaires-sweet-love",
        "overgeared-novel",
        "prodigiously-amazing-weaponsmith",
        "quick-transmigration-female-lead-male-god-never-stopping",
        "reborn-at-boot-camp-general-dont-mess-around",
        "reincarnation-of-the-strongest-sword-god",
        "remarried-empress",
        "shadow-slave",
        "she-shocks-the-whole-world-after-retirement",
        "star-odyssey",
        "supreme-magus-novel",
        "the-abandoned-husband-dominates",
        "the-authors-pov",
        "the-demonic-king-chases-his-wife-the-rebellious-good-for-nothing-miss",
        "the-great-mage-returns-after-4000-years",
        "the-long-awaited-mr-han",
        "the-mech-touch",
        "the-sovereigns-ascension",
        "tyranny-of-steel",
        "war-sovereign-soaring-the-heavens-novel",
    ];
    //  const random = Math.floor(Math.random() * novels.length+1);
    const userRatingsData = [];
    for (let userId = 1; userId <= 4; userId++) {
        for (let novelId = 1; novelId <= 7; novelId++) {
            const rating = Math.floor(Math.random() * 5) + 1; // Random rating from 1 to 5
            const novel_id = novels[Math.floor(Math.random() * 50) + 1];
            userRatingsData.push([userId, novel_id, rating]);
        }
    }

    // Bulk insert query for user ratings
    const bulkInsertQuerys =
        "INSERT INTO rating_tbl (user_id, novel_id, rating) VALUES ?";
    await sql
        .query(bulkInsertQuery, [userRatingsData])
        .then(() => {
            console.log("Bulk insert successful");
            sql.end();
        })
        .catch((error) => {
            console.error("Error:", error);
            sql.end();
        });
});
// Sample dataset of user ratings for novels (dummy data)
const ratingss = [
    { userId: 1, novelId: 101, rating: 5 },
    { userId: 1, novelId: 102, rating: 3 },
    { userId: 1, novelId: 103, rating: 2 },
    { userId: 1, novelId: 104, rating: 4 },
    { userId: 1, novelId: 106, rating: 3 },
    { userId: 1, novelId: 111, rating: 1 },
    { userId: 2, novelId: 101, rating: 4 },
    { userId: 2, novelId: 102, rating: 2 },
    { userId: 2, novelId: 103, rating: 2 },
    { userId: 2, novelId: 104, rating: 2 },
    { userId: 3, novelId: 104, rating: 5 },
    { userId: 3, novelId: 102, rating: 2 },
    { userId: 3, novelId: 101, rating: 2 },
    { userId: 4, novelId: 111, rating: 2 },
    { userId: 4, novelId: 103, rating: 2 },
    { userId: 5, novelId: 103, rating: 5 },
    { userId: 6, novelId: 111, rating: 4 },
    { userId: 8, novelId: 105, rating: 3 },
    { userId: 11, novelId: 105, rating: 2 },
    // ... more data points ...
];
const rate = await sql.query(
    "select user_id as userId, novel_title as novelId, rating from rating_tbl;"
);
const ratings = rate[0];
// Function to calculate Euclidean distance between two users and their ratings
function euclideanDistanceRatings(userRatings1, userRatings2) {
    const novelIds = new Set([
        ...userRatings1.map((rating) => rating.novelId),
        ...userRatings2.map((rating) => rating.novelId),
    ]);
    // console.log(novelIds)
    let sum = 0;
    for (const novelId of novelIds) {
        // console.log("novelId",novelId)
        const rating1 = userRatings1.find(
            (rating) => rating.novelId === novelId
        );
        // console.log("rating1",rating1)
        const rating2 = userRatings2.find(
            (rating) => rating.novelId === novelId
        );
        // console.log("rating2",rating2);
        const ratingDiff =
            (rating1 ? rating1.rating : 0) - (rating2 ? rating2.rating : 0);
        sum += Math.pow(ratingDiff, 2);
    }

    return Math.sqrt(sum);
}

// k-Nearest Neighbors algorithm for user-based recommendation using Euclidean distance
function recommendNovelsByUser(userId, k) {
    // Filter out the user's own ratings
    const otherUsers = ratings.filter((rating) => rating.userId !== userId);

    // Calculate distances from the user to all other users
    const list = [];
    // console.table(ratings.filter((rating) => rating.userId === userId));

    const distances = otherUsers
        .filter((x) =>
            list.includes(x.userId) ? false : (list.push(x.userId), true)
        )
        .map((otherUser, index) => ({
            userId: otherUser.userId,
            distance: euclideanDistanceRatings(
                ratings.filter((rating) => rating.userId === userId),
                ratings.filter((rating) => rating.userId === otherUser.userId)
            ),
        }));
    // console.log(distances);
    // Sort distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);

    // Select the first 'k' neighbors

    const nearestNeighbors = distances.slice(0, k);

    // Collect novels rated by nearest neighbors but not by the user
    const recommendedNovels = new Set();
    // console.log("nearestNeighbors", nearestNeighbors);
    nearestNeighbors.forEach((neighbor) => {
        const neighborRatings = ratings.filter(
            (rating) => rating.userId === neighbor.userId
        );
        // console.log("neighborRatings", neighborRatings);
        neighborRatings.forEach((rating) => {
            if (
                !ratings.some(
                    (userRating) =>
                        userRating.userId === userId &&
                        userRating.novelId === rating.novelId
                )
            ) {
                // console.log("add_id", rating.novelId);
                recommendedNovels.add(rating.novelId);
            }
        });
    });

    // return Array.from(recommendedNovels);
    return ratings.filter((rating) =>
        Array.from(recommendedNovels).includes(rating.novelId)
    );
}

//Usage
const targetUserId = 5; // Target user for recommendation
const k = 10; // Number of neighbors to consider for recommendation

const recommendedNovels = recommendNovelsByUser(targetUserId, k);
// console.log(`Recommended Novel IDs: ${recommendedNovels.join(", ")}`);

export default router;
