const PostsDAO = require("./dao/posts.dao");
const UsersDAO = require("./dao/users.dao");
const CommentsDAO = require("./dao/comments.dao");

const dao = {
    posts: new PostsDAO(),
    users: new UsersDAO(),
    comments: new CommentsDAO(),
};

module.exports = {
    Query: {

        posts: async (_, __, ___, ____) => {
            // console.log('root', _)
            // console.log('args', __)
            // console.log('context', ___)
            // console.log('info', ____)
            return await dao.posts.all()
        },
        post: async (_, { id }) => await dao.posts.get(id),
        users: async (_, __) => await dao.users.all(),
        user: async (_, { id }) => await dao.users.get(id),
    },

    Post: {
        comments: async ({ id }, __) => await dao.comments.getAllFromPost(id),
        user: async ({ idUser }, _) => await dao.users.get(idUser),
    },

    User: {
        enam: async ({ name }, _) => name.split("").reverse().join(""),
        posts: async ({ id }, _) => await dao.posts.getAllFromUser(id),
        comments: async ({ id }, _) => await dao.comments.getAllFromUser(id),
    },

    Comment: {
        post: async ({ idPost }, _) => await dao.posts.get(idPost),
        user: async ({ idUser }, _) => await dao.users.get(idUser),
        replies: async ({ id }, _) => await dao.comments.getAllFromComment(id),
    },
};
