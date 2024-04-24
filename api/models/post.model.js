module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    post_id:{

        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
    },

    summary: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.STRING,
    },
  });
  return Post;
};
