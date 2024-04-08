const express = require('express');
const cors = require('cors');


const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const pool = require('./config/db');
const sequelize = require('./config/db');


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)


app.get('/', (req, res) => {
    res.send('server is running');
})


// Sync Sequelize models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });




