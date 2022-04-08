const typeDefs = `
    type Query {
        posts: [Post]
        post(id: ID!): Post
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        comment(post: Int!, user: Int!, comment: Int!): Comment
        user(name: String!, login: String!): User
        post(name: String!): Post
    }

    type Post {
        id: ID!
        image: String
        user: User
        comments: [Comment]
    }

    type User {
        id: ID!
        email: String
        name: String
        enam: String
        comments: [Comment]
        posts: [Post]
    }

    type Comment {
        id: ID!
        idUser: Int,
        idPost: Int,
        idComment: Int,
        user: User
        post: Post
        replies: [Comment]
        contenido: String
    }
`;

module.exports = typeDefs;
