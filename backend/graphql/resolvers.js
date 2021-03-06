const Quote = require('../models/quote');
const Author = require('../models/author');
var mongoose = require('mongoose');

module.exports = {
  /*****************************************/ 
  /* Quote CRUD
  /*****************************************/
  quotes: async function () {
    const quotes = await Quote.find();
    return {
      quotes: quotes.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },
  getQuote: async function ({ id }) {
    var objectId = mongoose.Types.ObjectId(id);
    const quote = await Quote.findById(objectId)
    console.log(quote);
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
  createQuote: async function ({ quoteInput }) {
    const quote = new Quote({
      quote: quoteInput.quote,
      authorId: quoteInput.authorId,
    });
    const createdQuote = await quote.save();
    return {
      ...createdQuote._doc,
      _id: createdQuote._id.toString(),
    };
  },
  updateQuote: async function ({ id, quoteInput }) {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error('No quote found.');
    }
    try {
    quote.quote = quoteInput.quote;
    quote.authorId = quoteInput.author;
    const query = { "_id": id };
    const update = { "$set": { "quote": quoteInput.quote, "authorId": quoteInput.authorId} };
    const options = { returnNewDocument: true };
    const updatedQuote = await Quote.findOneAndUpdate(query, update, options);
    return {
      ...updatedQuote._doc,
      _id: updatedQuote._id.toString(),
    };
    } catch(err) {
      console.log(err);
    }
  },
  deleteQuote: async function ({ id }) {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error('No quote found.');
    }
    await Quote.findByIdAndRemove(id);
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
  /*****************************************/ 
  /* Author CRUD
  /*****************************************/
  authors: async function () {
    const authors = await Author.find();
    return {
      authors: authors.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },
  createAuthor: async function ({ authorInput }) {
    const author = new Author({
      name: authorInput.name,
    });
    const createdAuthor = await author.save();
    return {
      ...createdAuthor._doc,
      _id: createdAuthor._id.toString(),
    };
  },
  updateAuthor: async function ({ id, authorInput }) {
    const author = await Author.findById(id);
    if (!author) {
      throw new Error('No author found.');
    }
    try {
    author.name = authorInput.name;
    const query = { "_id": id };
    const update = { "$set": { "name": authorInput.name} };
    const options = { returnNewDocument: true };
    const updatedAuthor = await Author.findOneAndUpdate(query, update, options);
    return {
      ...updatedAuthor._doc,
      _id: updatedAuthor._id.toString(),
    };
    } catch(err) {
      console.log(err);
    }
  },
  deleteAuthor: async function ({ id }) {
    const authorId = await Author.findById(id);
    if (!authorId) {
      throw new Error('No author found.');
    }
    await Author.findByIdAndRemove(id);
    return {
      ...authorId._doc,
      _id: authorId._id.toString(),
    };
  },
};
