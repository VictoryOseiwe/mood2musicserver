# Mood2Music Server

This repository contains the server-side logic for the Mood2Music website.

## Prerequisites

Before you begin, ensure you have the following installed or configured:

**Local Machine:**

* **Node.js:** This project is built using pure JavaScript with Express. You'll need Node.js to run the server.
* **PostgreSQL:** This project uses PostgreSQL as its database.

    * **Note:** The author mentions considering Mongoose as a potential alternative.

**Online Services:**

* **Spotify Developer Account:** You'll need a Spotify developer account to obtain the following credentials:
    * **Spotify Client ID**
    * **Spotify Client Secret**

## Installation

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Install Dependencies:**
    ```bash
    cd mood2musicserver
    npm install
    ```
    * **Note:** There are some redundant dependencies.
3.  **Configure Environment Variables:**
    * Create a `.env` file in the root directory of the project.
    * Add the following environment variables to the `.env` file, replacing the placeholder values with your actual credentials:

    ```plaintext
    DB_NAME=<database_name>
    DB_USER=<database_user>
    DB_PASSWORD=<database_password>
    DB_HOST=<database_host>
    PORT=<server_port>
    JWT_SECRET="mood2music"
    SPOTIFY_CLIENT_ID=<spotify_client_id>
    SPOTIFY_CLIENT_SECRET=<spotify_client_secret>
    ```

## Running the Server

Once you have completed the installation and configuration steps, you can start the server using the following command:

```bash
nodemon index.js
```

# Author
## Victory Oseiwe