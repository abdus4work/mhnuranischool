import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './configs/dbConfig.js';
import configs from './configs/serverConfig.js';
import { initializeAdmin } from './initializeAdmin.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

// For ES Module __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const allowedOrigin = [
//   'http://localhost:5173',
//   'https://mh-fees-tracking-frontend.vercel.app'
// ]

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || allowedOrigin.includes(origin)) {
//         cb(null, true)
//       } else {
//         cb(new Error('Not allowed by CORS'))
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
//   })
// )

app.use('/api', apiRouter);

// ✅ Serve frontend static files (after build)
const publicPath = path.resolve(__dirname, '../../frontend/dist');

app.use(express.static(publicPath));

// ✅ Catch-all route to serve index.html for SPA
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Error handling middleware
app.use(errorMiddleware);

// Start the server and connect to the database
connectDB()
  .then(() => {
    app.listen(configs.PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${configs.PORT}`);
    });
    initializeAdmin();
  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  });
