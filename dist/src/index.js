import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { connect } from "mongoose";
import Book from "../model/bookModel.js";
const MONGODB = "mongodb+srv://moktanshail9:admin@cluster0.m0uqblx.mongodb.net/Books?retryWrites=true&w=majority&appName=Cluster0";
const typeDefs = `#graphql
    type Book{
        _id: String
        author: String
        title: String
        year: Int
    }

    input BookInput{
        author: String
        title: String
        year: Int
    }

    type Query{
        getBook(ID:ID!):Book!
        getBooks(limit: Int): [Book]
    }

    type Mutation{
        createBook(bookInput: BookInput):String!
        updateBook(ID:ID!, bookInput: BookInput): String!
        deleteBook(ID:ID!): String!
    }
        
`;
const resolvers = {
    Query: {
        async getBook(_, { ID }) {
            return await Book.findById(ID);
        },
        async getBooks(_, { limit }) {
            return await Book.find().limit(limit);
        }
    },
    Mutation: {
        async createBook(_, { bookInput: { author, title, year } }) {
            const res = await new Book({ author, title, year }).save();
            return res._id;
        },
        async updateBook(_, { ID, bookInput: { author, title, year } }) {
            await Book.updateOne({ _id: ID }, { $set: { author, title, year } });
            return "Book details updated";
        },
        async deleteBook(_, { ID }) {
            await Book.findByIdAndDelete({ _id: ID });
            return "Book deleted successfully";
        }
    }
};
await connect(MONGODB);
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server is ready at ${url}`);
