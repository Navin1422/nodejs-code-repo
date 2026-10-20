import { prisma } from '../config/db.js';
import bcrypt from "bcryptjs" // Used to hash passwords user

const register = async (req,res) => {
    // const body = req.body; // body here contains the data's that is being sent from frontend as req to backend
    // res.json(body);
    // console.log(req.body.name);

    const {name , email , password} = req.body; // Extracting the name,email,password datas that is sent by client as request(req) to backend

    const existingUser = await prisma.user.findUnique(  // to trigger suggestions of methods on vs code type cmd+space+p and enter trigger suggest then the suggestions will appear near dot
        {
            where: {email: email}, // Here checking if user already exists in database usind findUnique function in User table
        }
    );

    if(existingUser){
        return res.status(400).json({error: "The User with Mail Id already exists in the Application"}); // Here im specifying 400 Bad request since it is client error that email already exists
        // we're returning because it wont move forward with the request and will break
    }
    
    // Hash Password
    // To use hashing install and use package called bcryptjs
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Add user to table
    const user = await prisma.user.create(
      {
        data: {
            name,
            email,
            password: hashedPassword,
        },
      },
    );

    res.status(201).json(
        {
            status: "Success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: hashedPassword, // i know hashedPassword should not be returned in API response but just for learning and checking i did this
                }
            }
        }
    )

}

// Using JWTs for Logging 

const login = async (req,res) => {
    const { email , password } = req.body;

    // Check is email exists in the server(DB)
    const User = await prisma.user.findUnique({
        where: {email: email},
    })

    if(!User){
        return res.status(401).json({error: "Invalid Email or Password"});
    }

    // Check is its an correct password entered by user
    const checkPass = await bcrypt.compare(password, User.password);

    if(!checkPass){
        return res.status(401).json({error: "Invalid Email or Password"});
    }

    res.status(202).json({
        datas: {
            
            email: User.email,
        }
    })
}

export { register, login };