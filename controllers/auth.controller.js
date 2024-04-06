
const loginController = async(req, res)=>{
    try {
        const {email, password} = req.body;
        
        return res.status(200).json({message: "login success"});
    } catch (error) {
        console.log("error in loginController", error);
       return res.status(500).json({message: error.message});
    }
}




module.exports = {loginController}