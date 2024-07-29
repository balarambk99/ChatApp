const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/stream")
const schema=mongoose.Schema({
    roomid:{type:String,required:true,unique:true},
    hostpassowrd:{type:String,required:true},
    joinpassword:{type:String,required:true}
})
const model=mongoose.model("rooms",schema);
const creatRoom=async(data)=>{
    try{ console.log(data.roomid);
        const room=await model.findOne({roomid:data.roomid});
         
        console.log(data.roomid+"  "+data.joinpassword+" "+data.hostpassowrd);
        if(!(typeof(room)===null))
         {  const rooms=new model(data);
            console.log("creating rooms");
             const dat=await rooms.save();
             console.log("room is created")
            console.log(dat);
         }else{
            console.log("already roooms is their please chage")
         }
    }catch(e)
    {
        console.log("Error:"+e);
    }
    

}
const isValidRoom=async (data)=>{
    console.log("room is there valide")
   try{ console.log("room is there valide");
         const size= await model.findOne(data.roomid);
         if(typeof(size)!=null)
         {  console.log("room is there");
            return true;
         }else
         {  console.log("room is not there");
            return false;
         }
        }catch(e)
        {
            console.log(e);
        }


}
const checkPassword=async (data)=>{
   try{ const password=data.password;
    const id=data.roomid;
    console.log(" not current roomf pass");
    const room= await model.findOne({roomid:id});
     if(typeof(room)==null)
        {console.log(" not current room pass");
            return false;
        }
    if(room.password.equals(password))
    {   console.log("room pass");
        return true;
    }else
    {   
        false
    }
}catch(e)
{
    console.log("error",e);
}


}
const changepassword=async (data)=>{
    try{  console.log(data.roomid);
        console.log(" not current room pass");
        const room=await model.findOne({roomid:data.roomid});
        console.log(room);
        if(typeof(room)!=null)
        {  console.log("data updare")
           const change=await model.updateOne({roomid:data.roomid},{$set:{joinpassword:data.joinpassword}})
           console.log("data is changed")
           console.log(change);
            return true;
        }else{
            console.log("there is no rooms")
            return false;
        }

    }catch(e)
    {
           console.log("Error "+e);
    }

}


module.exports={
    isValidRoom,
    changepassword,
    creatRoom,checkPassword,
    model

}