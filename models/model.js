const { timeStamp } = require('console');
const { application } = require('express');
const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean
    },
    usercookie: {
        type: String
    }
})


const newsSchema = new mongoose.Schema({
    id:{
        required: true,
        type: Number
    },
    image:{
        required: true,
        type: String
    },
    headlines:{
        required: true,
        type: String
    },
    body:{
        required: true,
        type: String
    },
    datePublished: {
        type: String,
        default: () => new Date()
    }
})

const projectsSchema = new mongoose.Schema({
    id:{
        required: true,
        type: Number
    },
    image:{
        required: true,
        type: String
    },
    headlines:{
        required: true,
        type: String
    },
    author:{
        required: true,
        type: String
    },
    body:{
        required: true,
        type: String
    },
    datePublished: {
        type: String,
        default: () => new Date()
    },
    projectLink: {
        required: true,
        type: String
    }
})

const messageSchema = new mongoose.Schema({
    id:{
        required: true,
        type: Number
    },
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String
    },
    message:{
        required: true,
        type: String
    },
    dateSent: {
        type: String,
        default: () => new Date()
    }
})



const users = mongoose.model('UserData', userSchema)
const news = mongoose.model('newsData', newsSchema)
const projects = mongoose.model('projectsData', projectsSchema)
const messages = mongoose.model('messageData', messageSchema)

module.exports = {
    users, news, projects, messages
}