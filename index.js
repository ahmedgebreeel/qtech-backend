const express = require('express');
const authRoutes = require('./routes/auth.routes');
const pool = require('./config/db');
const app = express();
const PORT = 3000;



app.use(express.json());

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('server is running');
})


app.listen(PORT, ()=>{
    console.log(`app listening at http://localhost:${PORT} `);

    pool.getConnection((err, connection) => {
        if(err) throw err;
        else console.log('connected to DB');
    })
})




