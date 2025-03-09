import { Mood } from "../model/moodModel.js";

export const addMood = async (req, res) => {
    const { mood } = req.body; //gets user mood from front end

    try {
        const userId = req.user?.userId; // gets current user id

        //checks if user is authenticated
        if(!userId){
            return res.status(401).json({ message: "User not authenticated" });
        }

        //checks if mood is provided
        if(!mood){
            return res.status(400).json({ message: "Mood is required" });
        }

        //creates a new mood for user
        const newMood = await Mood.create({ user_id: userId, mood });

        res.status(201).json({ message: "Mood created successfully ", mood: newMood });
    } catch (error) {
        console.error("Error adding mood", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMoods = async (req, res) => {
   const userId = req.user?.userId //gets user id
   try {
    //gets users moods
    const allMood = await Mood.findAll({
        where: { user_id: userId },
        order: [["createdAt", 'DESC']]
    })

    //check if there's no mood available
    if (allMood.length === 0){
        res.status(404).json({ message: "No mood found for this user."})
    }

    //returns an array of user(s) mood
    res.status(201).json({
        moods: allMood
    })
   } catch (error) {
    console.error("Error fetching user mood(s)", error)
    res.status(404).json({ message: "Error fetching mood(s) for user."})
   }
}