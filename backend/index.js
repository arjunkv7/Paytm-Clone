const express = require("express");
const cors = require('cors');
const { authMiddleWare } = require("./middlewares/authMiddleware");

const app = express();

app.use(cors())
app.use(express.json());

const rootRouter = require('./routes/index')
app.use('/api/v1', rootRouter);

const userRouter = require('./routes/user')
app.use('/api/v1/user', userRouter);

const accountRouter = require('./routes/account');
app.use('/api/v1/account', authMiddleWare, accountRouter);

const connectToDb = require("./config/db");
connectToDb();

app.use((err, req, res, next) => {
    console.log(err)
    if (err) {
        res.send("Something went wrong")
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});



