const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/stream");
const schema=mongoose.Schema( { 
                              userid:{type:String,required:true,unique:true},
                                passowrd:{type:String,required:true},
                                 })
const user=mongoose.model("register",schema);
const register=async (data)=>{
                    const coll= user(data);
                    await  coll.save();
                           }
