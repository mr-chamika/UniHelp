import User from "../Models/UserModel.js";

const createUser =  async (req, res) => {
    
    const { name, uni, facualty, email, phone, username } = req.body;

    const newUser = await new User({

        Name: name,
        Username:username,
        University: uni,
        Facualty: facualty,
        Email: email,
        Phone: phone

    })
    

    newUser.save();

    res.json({newUser});

}

export default createUser;