const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');

// Create Express app
const app = express();

// Set up session middleware
app.use(
    session({
        secret: 'avani8668kulkarni',
        resave: false,
        saveUninitialized: true
    })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'railway'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up parsing of request bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Create a signup route
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    connection.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email],
        (err, rows) => {
            if (err) {
                throw err;
            }

            if (rows.length > 0) {
                res.redirect('/bookings');
                return;
            }

            connection.query(
                'INSERT INTO users (username, email) VALUES (?, ?)',
                [username, email],
                (err, result) => {
                    if (err) {
                        throw err;
                    }

                    const userId = result.insertId; // Get the inserted user ID

                    req.session.userId = userId; // Store the user ID in the session

                    res.redirect('/bookings');
                }
            );
        }
    );
});

// Route to handle user sign-out
app.get('/sign-out', (req, res) => {
    res.sendfile(path.join(__dirname, 'sign-out.html'));
    // Clear session data or perform any other necessary sign-out logic
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});




// Create a bookings route
app.post('/bookings', (req, res) => {
    const userId = req.session.userId; // Get the user ID from the session



    // Get the form data
    const from = req.body.from;
    const to = req.body.to;
    const date = req.body.date;
    const passenger = req.body.passenger;
    const travelClass = req.body.travelClass;

    // Insert the form data into the bookings table
    connection.query(
        'INSERT INTO bookings (user_id, from_location, to_location, booking_date, passenger, travel_class) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, from, to, date, passenger, travelClass],
        (err, result) => {
            if (err) {
                throw err;
            }

            res.send('Booking successful'); // Send a success message
        }
    );
});
app.get('/bookings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bookings.html'));
});
app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'feedback.html'));

});


// Define a POST route to handle form submission
app.post('/feedback', (req, res) => {
    const { username, email, message } = req.body;

    // Insert the form data into the database
    const sql = 'INSERT INTO feedback (username, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [username, email, message], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        } else {
            res.send("feedback submitted successfully");
        }
    });
});





// Middleware to check if the user is signed up
const checkSignUp = (req, res, next) => {
    const userId = req.session.userId; // Get the user ID from the session

    // If the user ID is not present, redirect to the sign-up page
    if (!userId) {
        res.redirect('/signup');
    } else {
        next(); // Proceed to the next route handler
    }
};

// Create a bookings route with the checkSignUp middleware
app.get('/bookings', checkSignUp, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'bookings.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
