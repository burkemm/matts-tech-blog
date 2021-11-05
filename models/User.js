const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// This user class extends the model constructor.
class User extends Model {
  // Verify the password using bcrypt.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// Initialize the user class with attributes of id, name, email, and password.
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // These hooks are used to take in the newUserInfo and the password before creation and updating.
    hooks: {
      beforeCreate: async (newuserInfo) => {
        newuserInfo.password = await bcrypt.hash(newuserInfo.password, 10);
        return newuserInfo;
      },
      beforeUpdate: async (updateduserInfo) => {
        updateduserInfo.password = await bcrypt.hash(updateduserInfo.password, 10);
        return updateduserInfo;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
