const express = require('express');
const zod = require('zod');
const UserModel = require('../model/User');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { authMiddleWare } = require('../middlewares/authMiddleware');
const { Types } = require('mongoose');
const Account = require('../model/Account');

let signupPayload = zod.object({
    username: zod.string().minLength(4),
    firstName: zod.string().maxLength(50),
    lastName: zod.string().maxLength(50),
    password: zod.string()
});

let signInPayload = zod.object({
    username: zod.string(),
    password: zod.string
});

router.post('/signup', async (req, res) => {
    let parsedPayload = signupPayload.safeParse(req.body);
    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    let userExist = await UserModel.findOne({ username: req.body.username });

    if (userExist) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    let newUser = await UserModel.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword
    });

    let userId = newUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    let token = jwt.sign({ userId: userId }, JWT_SECRET);
    return res.status(200).json({
        message: "User created successfully",
        token: token
    });

});

router.post('/signin', async (req, res) => {
    let parsedPayload = signInPayload.safeParse(req.body);
    if (!parsedPayload.success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }
    let user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }
    let body = req.body;
    try {
        let verifyPassword = await bcrypt.compare(body.password, user.password);
        if (!verifyPassword) {
            return res.status(411).json({
                msg: "Wrong password"
            });
        }
        let token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({
            token: token
        });

    } catch (error) {
        console.log(error)
        return res.status(411).json({
            message: "Error while logging in"
        });

    }
});

router.put('/', authMiddleWare, async (req, res) => {
    let body = req.body;
    let updateObject = { ...body }
    if (body.password) {
        updateObject.password = await bcrypt.hash(body.password, 10);
    }
    let updatedUser = await UserModel.findOneAndUpdate({
        _id: new Types.ObjectId(req.userId)
    }, updateObject);

    if (!updateObject) {
        return res.status(400).json({
            msg: "Something went wrong"
        });
    }
    return res.status(200).json({
        msg: "Details upated successfully"
    })
});


module.exports = router;