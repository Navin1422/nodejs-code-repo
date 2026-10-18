// 1) import express package 
import express from 'express';

// 2) importing dotenv(.env) file configurations
import {config} from 'dotenv';

// 3)
import {connectDB, disconnectDB} from './config/db.js';

// 4) Import Routes
import movieRoutes from './routes/MovieRoutes.js';

config(); // calling config function for dotenv
connectDB(); // Calling connectDB() function which is in ./config/db.js file to connect with database from server

const app = express();

// API ROUTES
app.use('navinharitha' , movieRoutes);
app.use('/Movies' , movieRoutes);
app.use('/',movieRoutes);

app.get("/NH", (req,res) => {
    res.json({love : "This is divine love"});
})

const PORT = 5001;
const server = app.listen(PORT , () => {
    console.log(`Server Initialised at PORT ${PORT}`);
})


// Handling database connection errors which may cause the whole project to stop or cause memory leak to database

//Handles unhandled promise rejections (eg.. database connection errors)
// UnhandledRejection = This is intended to catch Promise rejections that were never handled.
process.on("unhandledRejection", (err) => {     // process.on listens for events emitted by Node js regurlarly and gets trigged if the parameter mentioned if emitted by node js then callback - (err) is triggred and will execute
    // process.on(eventName, callback); if eventName(UnhandledRejection) is emitted by node js then callback(err) will be trigged and that function will be executed.
    console.error("Unhandled Rejection" , err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// To Handle uncaught exception
// UncaughtException - This catches errors that crash the program because they weren't caught.
process.on("uncaughtException" , async (err) => {
    console.error("Uncaught Exception " , err);
    await disconnectDB();
    process.exit(1);
})

// Graceful shutdown
// SIGTERM - SIGTERM signal requests an application to perform a graceful shutdown—finishing active requests, closing connections, and cleaning up resources before exiting—rather than terminating abruptly. This typically occurs during container stops, cloud app restarts, or manual process terminations.
process.on("SIGTERM" , () =>{
    console.log("STIGTERM Received , shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
})

