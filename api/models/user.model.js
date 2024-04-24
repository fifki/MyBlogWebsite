module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_id:{
        
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
};


