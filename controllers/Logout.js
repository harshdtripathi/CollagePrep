const express= require("express");

exports.logout= async(req,res)=>{
    try{
        res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
        return res.status(200).json({
            success:true,
            message:"logged out successfully"
        });

    }
    catch(e)
    {
        console.log(e.message);
        return res.status(500).json({
            success:false,
            message:e.message
        })
        
    }
}