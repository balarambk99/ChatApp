const app=require("express").Router();
const smtp=require("nodemailer");
const genpass=require("generate-password")
const mail=smtp.createTransport({
    service: 'Gmail',
    auth: {
      user: 'balarambk99@gmail.com',
      pass: 'BK@9618714335',
    }
  });
  
app.register("/register",(req,res)=>{
    const [username,password,email]=req.body;
    const number=genpass.generate({
        length:6,
        Strings:true
    })
    const register={name:username,password:password,email:email,};




})


module.exports={app}