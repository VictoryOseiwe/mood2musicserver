import { User } from "./userModel.js";
import { Mood } from "./moodModel.js";
import { Playlist } from "./playlistModel.js";


//Definig associations between the user model and the (mood and playlist models)
//So each users can get their moods and playlists.
Mood.belongsTo(User, { foreignKey: "user_id", as: 'user'});
User.hasMany(Mood, { foreignKey: "user_id", as: 'moods', onDelete: "CASCADE"});


Playlist.belongsTo(User, { foreignKey: "user_id", as: 'user'});
User.hasMany(Playlist, { foreignKey: "user_id", as: 'playlists', onDelete: "CASCADE"});
