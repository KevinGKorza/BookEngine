//Authentication Error 
const { AuthenticationError } = require('apollo-server-express');
//models importing
const { User, BookInput } = require('../models');
//token function importing
const { signToken } = require('../utils/auth');


const resolvers = {
    //Query type
    Query: {
        //Me which returns a user type
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__V -password')
                .populate('savedBooks')
                return userData
            }
            throw new AuthenticationError('You are not logged in, please log in!');
        },
    },
    //Mutation 
    Mutation: {
        //login mutation 
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw new AuthenticationError('Your login information is incorrect, please try again!');
            }
            const token = signToken(user);
            return {token, user};
        },
        //add user mutation 
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        //save book mutation
        saveBook: async (parent, {book}, context) => {
            if (context.user){
                const addBook = await User.findBtIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: book}},
                    {new: true}
                );
                return addBook;
            }
            throw new AuthenticationError('You need to be logged in to save your book!');
        },
        //remove book mutation
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const removeBook = await User.findBtIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks:{bookId: bookId}}},
                    {new: true}
                );
                return removeBook;
            }
            throw new AuthenticationError('You need to be logged in to remove your book!')
        }
    }
};
module.exports = resolvers;
