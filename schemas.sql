CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  email VARCHAR(255)
);



CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  booking_date DATE,
  passenger INT,
  class VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);



CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT
);

-- showing the all databases which are available in whole mysql server
SHOW DATABASES;

-- connecting to the specific database 
USE database_name;

-- inserting values into database 
INSERT INTO datbase_name (col_name_1,col_name_2,col_name_3)
VALUE (data_1,data_2,data_3)

-- showing data of the table as a resul 
SELECT * FROM table_name;


