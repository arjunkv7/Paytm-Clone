const express = require('express');
const Account = require('../model/Account');
const { default: mongoose, Types } = require('mongoose');

const router = express.Router();

router.get('/balance', async (req, res) => {
    let userAccount = await Account.findOne({
        userId: req.userId
    });

    res.status(200).json({
        balance: userAccount.balance
    });
});

router.post('/transfer', async (req, res, next) => {
    let userId = req.userId;
    let session = mongoose.startSession();
    (await session).startTransaction()
    try {
        let { to, amount } = req.body;
        let toAccount = await Account.findOne({
            userId: new Types.ObjectId(to)
        });

        if (!toAccount) {
            (await session).abortTransaction()
            return res.status(400).json({
                message: "Invalid account"
            })
        }
        let userAccount = await Account.findOne({userId});
        if (userAccount.amount < amount) {
            (await session).abortTransaction()
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        let updatedFromuser = await Account.findOneAndUpdate({ userId: userId }, {
            $inc: {
                balance: -amount
            }
        });

        let updatedToUser = await Account.findOneAndUpdate({ userId: new Types.ObjectId(to) }, {
            $inc: {
                balance: amount
            }
        });
        if (!updatedFromuser || !updatedToUser) {
            (await session).abortTransaction();
            return res.status(400).json({
                message: "Transaction failed"
            });
        }

        (await session).commitTransaction();
        return res.status(200).json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.log(error);
        (await session).abortTransaction;
        next(error)

    }
});

module.exports = router;