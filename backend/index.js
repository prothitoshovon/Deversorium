import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import hostelRoutes from './routes/hostels.js';
import tenantRoutes from './routes/tenants.js';

const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/hostels',hostelRoutes);
app.use('/tenants',tenantRoutes);

const CONNECTION_URL = "mongodb+srv://deversorium:iloveiplab@cluster0.flox5m0.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
                .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT)))
                .catch((error) => console.log(error.message));
