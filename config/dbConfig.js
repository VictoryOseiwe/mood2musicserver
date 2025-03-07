import { Sequelize } from "sequelize"
import env from 'dotenv'

env.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
)


async function testDB(){
    try {
        await sequelize.authenticate()
        console.log("Database connection established")
    } catch (error) {
        console.log("Database connection failed: " + error)
    }
}

testDB()  // Test the connection to the database before starting the server.  This prevents the server from crashing if the database is not available.  This is a good practice.  You might want to include this in your server startup script.  For example, in a Node.js server using Express:

// export default sequelize;