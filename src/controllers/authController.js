
const register = async (req,res) => {
    
    res.json({this:"auth controller"});
}

const signup = async (req,res) => {
    res.send("User sign up page");
}

export { register , signup };