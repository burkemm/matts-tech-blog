const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userInfo = require('./userInfo.json');
const dataCollection = require('./dataCollection.json');
const itemData = require('./itemData.json');
// This seeds the database.
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // This bulk creates user info using individual hooks.
  const users = await User.bulkCreate(userInfo, {
    individualHooks: true,
    returning: true,
  });
  // This is for creating the collection of posts.
  for (const collection of dataCollection) {
    await Collection.create({
      ...collection,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // this is for finding all in the collection.
  const collectionData = await Collection.findAll({});
  // Map the collecionData using the collect constant
  const collect = collectionData.map((col) => col.get({ plain: true }));

  for (const item of itemData) {
    await Item.create({
      ...item,
      collection_id: collect[Math.floor(Math.random() * collect.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
