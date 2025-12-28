import User from "../models/User.model.js";
import { updateUserService,deleteUserService } from "../services/user.services.js";

export const deleteUser = async (req, res) => {

  try {

   await deleteUserService(req.body,req.session.user)
   res.redirect("/admin")
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {

  try{
       await updateUserService(req.body,req.session.user)
       return res.redirect("/admin")

  }catch(err){

    req.session.error=err.message
    return res.redirect("/admin")
  }
};
