const User = require("./User");
const Post = require("./Post");

// This sets up the relationships. It sets the user_id as the foreign key. A user can have many posts.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
// Each post belongs to a certain user.
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };