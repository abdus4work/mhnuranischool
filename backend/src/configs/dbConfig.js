import mongoose from 'mongoose';

import configs from './serverConfig.js';



/**
 * Connects to the MongoDB database using the mongoose library.
 * Logs a success message upon connection or an error message if the connection fails.
 */
export default async function connectDB() {
  try {
    // Attempt to connect to the database using the connection URL
    await mongoose.connect(configs.DB_URL);
    console.log(`Connected to database from ${configs.NODE_ENV} environment`);
  } catch (err) {
    // Log an error message if the connection fails
    console.log('Error connecting to database: ', err);
  }
}
