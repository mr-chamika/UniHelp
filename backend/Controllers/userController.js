import User from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

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

    const { username, password } = req.body;

    const user = await User.findOne({ Username: username });

    if (user != null) {

        if (user.Password === password) {

            const token = jwt.sign({ userId: user._id, username: user.Username, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1h' })

            res.json({ userId: user._id, username: user.Username, role: user.Role, token });

        } else {

            res.json({ message: 'Wrong Password' })


        }

    } else {

        res.json({ message: 'Invalid Username' })

    }


}

export const getUser = async (req, res) => {


    const uid = (req.params.id);
    const user = await User.findOne({ _id: uid }, { Username: 0, Password: 0, Role: 0 })
    res.json({ user })

}

export const forgotPassword = async (req, res) => {

    const { userEmail } = req.body;

    const record = await User.find({ Email: userEmail });

    if (record.length == 1) {

        res.json({ message: record[0].Username })

    } else {

        res.json({ message: 'User not found' })

    }

}

export const updatePassword = async (req, res) => {

    const { userEmail, newp } = req.body;

    const record = await User.find({ Email: userEmail });

    const done = await User.findByIdAndUpdate(record[0]._id, { $set: { Password: newp } });

    if (done) { res.json({ message: 'Password updated successfully' }) } else { res.json({ message: 'Error while updating password' }) }

}