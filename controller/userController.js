const Users = require("../model/users");
const bcrypt = require('bcryptjs');
const { setUser, getUser } = require("../service/auth");
const URL = require("../model/shortUrl");

async function handleUserRegistration(req,res){
    const {fullName,email,password} = req.body;
    // console.log(fullName,email,password);
    if(!fullName || !email || !password) return res.status(400).json('Body is empty');

    try{
        const existingUser = await Users.findOne({email});
        
        if(existingUser) return res.status(400).json({msg: "User Already Exist"})
        
        const hashedPassword = await bcrypt.hash(password,10);

        await Users.create({
            fullName,
            email,
            password: hashedPassword
        })
        res.status(200).json({msg: "User registered successfully"})

    }catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
      }

    
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    // console.log(email,password);

    if(!email || !password) return res.status(400).json('Body is empty');

    const user = await Users.findOne({email});

    if(!user) return res.status(404).json({message: "user Not Found"}); 

    const isMatched = await bcrypt.compare(password,user.password);

    if(!isMatched){
        return res.status(400).json("Invalid Credentials")
    }else{
        const token = setUser(user)
        res.status(200).json({msg: "Login Successfull",token:token})

    }

        

}

async function handleUserActivity(req,res){
    const token = req.headers.authorization.split(' ')[1];  
    console.log(token);
    if(!token) return res.status(404).json({msg: "Invalid User"});

    const user = getUser(token);
    console.log(user);
    if(!user) return res.status(404).json({msg: "User Not Found"});
    
    const urls = await URL.find({userId: user.id})

    res.json({urls: urls}) 
}


module.exports ={
    handleUserRegistration,
    handleUserLogin,
    handleUserActivity
} 