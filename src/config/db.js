// 1) import PrismaClient
import {PrismaClient} from "@prisma/client";

// 2) creating obj for the PrismaClient 
export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'DEVELOPMENT' ? ["query","error","warn"] : ["error"] // process is environment variable , process is a global object provided by Node.js. It gives your application information and control over the current Node.js process.
    // this log property ensures that if theres an error in database then it doesnt break the whole project

    // This uses a ternary operator — basically an if-else in one line.
    // - If NODE_ENV === 'DEVELOPMENT', Prisma logs queries, errors, and warnings.
    // - Otherwise, Prisma logs only errors.   
});

// 3) Function to connect to database
export const connectDB = async () => { // It is async because connecting to database is asynchronous operation
    try{
        await prisma.$connect();
        console.log("The Database is sucessfully connected via Prisma");
    }
    catch(error){
        console.error(`There is an error connecting with db ${error.message}`);
        process.exit(1);
    }
}


// 4) Function to disconnect to database
export const disconnectDB = async () =>{
    await prisma.$disconnect();
}


//export default {prisma, connectDB, disconnectDB};
