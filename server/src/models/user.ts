import mongoose,{model,Schema} from "mongoose";
import { IUSER } from "../types/modeltype";
import bcrypt from "bcrypt"
const UserSchema = new Schema<IUSER>({
    name: {type:String, required:true,index:true},
    email:{type:String, required:true,unique:true,index:true,},
    username:{type:String, required:true, index:true, unique:true},
    verificationStatus:{type:Boolean, default:false},
    verificationCode:String,
    password:{type:String},
    showLastSeen:{type:Boolean, default:true},
    lastSeen:Date,
    showReadStatus:{type:Boolean, default:true},
    authStrategy:String,
    googleId:String,
    avatar:String,
})
UserSchema.pre("save",async function(){
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    }
    
    
})
const User = model("User",UserSchema)
export default User
