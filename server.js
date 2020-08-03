const express = require('express');
const connectDb = require('./config/db');

const app = express();

// connect database
connectDb();

// init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API running'));

app.use('/api/records', require('./api/records'));
app.use('/api/payments', require('./api/payments'));
app.use('/api/users', require('./api/users'));
app.use('/api/account', require('./api/account'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/profiles', require('./api/profiles'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/tournaments', require('./api/tournaments'));
app.use('/api/result', require('./api/result'));
app.use('/api/game', require('./api/game'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))