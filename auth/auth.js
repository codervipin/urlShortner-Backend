async function restrictToLoggedInUserOnly(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if(!token || token === "" || token === undefined) return res.status(400).json({msg: "User not logged in"})
    next();

}

module.exports = restrictToLoggedInUserOnly