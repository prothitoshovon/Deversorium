import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import hostelRoutes from './routes/hostels.js';
import tenantRoutes from './routes/tenants.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/hostels',hostelRoutes);
app.use('/tenants',tenantRoutes);
app.use('/user',userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
                .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT)))
                .catch((error) => console.log(error.message));
