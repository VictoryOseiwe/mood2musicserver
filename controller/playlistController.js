import SpotifyWebApi from "spotify-web-api-node";
import { Mood } from "../model/moodModel.js";
import { Playlist } from "../model/playlistModel.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Spotify API
const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Function to get Spotify Access Token
const getSpotifyAccessToken = async () => {
  try {
    const data = await spotifyAPI.clientCredentialsGrant();
    const spotifyAccessToken = data?.body?.access_token;
    spotifyAPI.setAccessToken(spotifyAccessToken);
    return spotifyAccessToken;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
  }
};

// Get music recommendation and save it to DB
export const recommendMusic = async (req, res) => {
  const userId = req.user?.id;
  try {
    // Get the latest mood of the user
    const latestMood = await Mood.findOne({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    if (!latestMood) {
      return res.status(404).json({ message: "No mood found for user." });
    }

    const mood = latestMood.mood.toLowerCase();

    // Authenticate with Spotify
    await getSpotifyAccessToken();

    // Fetch recommended playlists based on mood
    const playlistResponse = await spotifyAPI.searchPlaylists(mood);

    if (!playlistResponse?.body?.playlists?.items?.length) {
      return res
        .status(404)
        .json({ message: "No playlists found for this mood." });
    }

    // Extract relevant playlist details
    const recommendedPlaylist = playlistResponse?.body?.playlists?.items;
    const randomPlaylist =
      recommendedPlaylist[
        Math.floor(Math.random() * recommendedPlaylist.length)
      ];
    if (!randomPlaylist) {
      return res
        .status(404)
        .json({ message: "No playlists found for this mood." });
    }
    const playlistData = {
      user_id: userId,
      mood: mood,
      playlist_name: randomPlaylist?.name,
      playlist_url: randomPlaylist?.external_urls?.spotify,
      playlist_image:
        randomPlaylist?.images?.length > 0
          ? randomPlaylist?.images[0]?.url
          : null,
    };

    // Save recommended playlist to database
    const savedPlaylist = await Playlist.create(playlistData);

    res.status(201).json({
      message: "Playlist recommendation saved successfully",
      mood,
      playlist: {
        name: savedPlaylist?.playlist_name,
        url: savedPlaylist?.playlist_url,
        image: savedPlaylist?.playlist_image,
      },
    });
  } catch (error) {
    console.error("Error fetching and saving playlist:", error);
    res
      .status(500)
      .json({ message: "Error fetching playlist recommendations" });
  }
};

export const getPlayListsFromDb = async (req, res) => {
  const userId = req?.user?.id;

  try {
    const allPlaylists = await Playlist.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(201).json({
      message: "Playlists Fetched successfully",
      allPlaylists: {
        name: allPlaylists?.playlist_name,
        url: allPlaylists?.playlist_url,
        image: allPlaylists?.playlist_image,
        playlistMood: allPlaylists?.mood,
      },
    });
  } catch (error) {}
};
