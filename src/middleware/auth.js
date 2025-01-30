const adminAuth = (req , res , next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";

    if(isAdminAuthorized){
        res.send("Admin Data");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
}