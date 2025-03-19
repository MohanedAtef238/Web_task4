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
