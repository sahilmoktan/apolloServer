import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone'
import { connect } from "mongoose";
import Book from "../model/bookModel.js"

const MONGODB = "mongodb+srv://moktanshail9:admin@cluster0.m0uqblx.mongodb.net/Books?retryWrites=true&w=majority&appName=Cluster0"

const typeDefs = `
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
        getBooks(Limit: Int): [Book]
    }

    type Mutations{
        createBook(bookInput: BookInput):String!
        updateBook(ID:ID!, bookInput: BookInput): String!
        deleteBook(ID:ID!): String!
    }
        
`