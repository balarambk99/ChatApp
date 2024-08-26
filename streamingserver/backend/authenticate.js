const {Router}=require("express")
const {create}=require("./firebase")
const app=Router();
app.get("/authenticate",(req,res)=>{
    console.log("authentication router")
})
app.post("/login",(req,res)=>{
    const [username,password]=req.body;
    const login={name:username,password:password};


})






module.exports=app;