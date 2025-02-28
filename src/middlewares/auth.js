const adminAuth = (req,res, next)=>{
    console.log("This is my first middleware");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(403).send("You are not authorized to access this page");
    }else{
        next();
    }
}


const userAuth = (req,res, next)=>{
    console.log("This is my first middleware");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(403).send("You are not authorized to access this page");
    }else{
        next();
    }
}


module.exports ={adminAuth,userAuth};