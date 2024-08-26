const {db}=require("./databas");
const {}=require("firebase/")

 async function create(user,data)
 { try{     
    const doc=await db.collection("chat").doc(user);
    await doc.add(data);
 }catch(e)
 {
    console.log(e)
 }

 }
 
 async function read(user) {
    try{await db.collection("chat").get();
    console.log("succerully reas");
    }catch(e)
    {
        console.log("error :"+e)
    }
    
 }

module.exports={read,create}