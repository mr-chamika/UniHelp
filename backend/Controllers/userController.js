import User from "../Models/UserModel.js";

export const createUser = async (req, res) => {

    const { name, uni, facualty, email, phone, username, password } = req.body;

    const newUser = await new User({

        Name: name,
        Username: username,
        University: uni,
        Facualty: facualty,
        Email: email,
        Phone: phone,
        Password: password

    })


    newUser.save();

    res.json({ newUser });

}

export const checkUser = async (req, res) => {

    const { username, email } = req.body;

    const checking_username = await User.find({ Username: username });

    const checking_email = await User.find({ Email: email });

    res.json({ username: checking_username, email: checking_email })


}

export const handleLogin = async (req, res) => {

    const { username } = req.body;

    const record = await User.find({ Username: username });

    res.json({ response: record });


}