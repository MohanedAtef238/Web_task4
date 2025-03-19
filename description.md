# Sequelize ORM with Node.js

In this tutorial, we will learn the **basics of Sequelize ORM** and how to use it with **Node.js** and **PostgreSQL**. Sequelize is a promise-based ORM that simplifies database interactions in Node.js applications.

---

## Steps:

1. **Install PostgreSQL and Sequelize** – Set up PostgreSQL and install Sequelize in a Node.js project.
2. **Connect to PostgreSQL** – Establish a connection to a PostgreSQL database.
3. **Define Models** – Create models for database tables.
4. **Perform CRUD Operations** – Insert, retrieve, update, and delete records.

---

## Installation

Ensure PostgreSQL is installed on your system. You can download it from the [official website](https://www.postgresql.org/download/).

Create a new Node.js project and install Sequelize along with the PostgreSQL driver:

```bash
npm init -y
npm install sequelize pg
```

---

## Connecting to PostgreSQL

Create a `database.js` file to establish a connection:

```javascript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'my_username', 'my_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
```

---

## Defining a Model

Create a `models/User.js` file to define a User model:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the connection

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
    city: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
```

---

## Grouping Exports in One File

Create a `models/index.js` file with the following content:

```javascript
const sequelize = require('../database');
const User = require('./User');

module.exports = { sequelize, User };
```

---

## Performing CRUD Operations

Create a `server.js` file to interact with PostgreSQL:

```javascript
const { sequelize, User } = require('./models');

async function main() {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync database
    await sequelize.sync();
    console.log('Database schema synchronized.');

    // Create a new user
    const newUser = await User.create({
      name: 'Alice',
      age: 25,
      city: 'New York',
    });
    console.log('User created:', newUser.toJSON());

    // Retrieve all users
    const users = await User.findAll();
    console.log(
      'Users:',
      users.map((user) => user.toJSON())
    );

    // Update a user if they exist
    const [updatedRows] = await User.update(
      { age: 26 },
      { where: { name: 'Alice' } }
    );
    if (updatedRows) {
      console.log('User updated.');
    } else {
      console.warn('No user found to update.');
    }

    // Delete a user if they exist
    const deletedRows = await User.destroy({ where: { name: 'Alice' } });
    if (deletedRows) {
      console.log('User deleted.');
    } else {
      console.warn('No user found to delete.');
    }
  } catch (error) {
    console.error('Error:', error.message || error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

// Execute the main function
main();
```

---

## Running the Application

Execute the script using:

```bash
node server.js
```

Expected output:

```
Database connected successfully.
Database schema synchronized.
User created: { id: 1, name: 'Alice', age: 25, city: 'New York' }
Users: [ { id: 1, name: 'Alice', age: 25, city: 'New York' } ]
User updated.
User deleted.
Database connection closed.
```

---
