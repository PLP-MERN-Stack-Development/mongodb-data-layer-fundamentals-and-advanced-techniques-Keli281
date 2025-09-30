const { MongoClient } = require('mongodb');

// same connection string from insert_books.js
const uri = "mongodb+srv://keli:1234@cluster0.ogus1a5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function runQueries() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        
        const database = client.db("plp_bookstore");
        const books = database.collection("books");

        // BASIC CRUD OPERATIONS
        console.log("\n 1. Fantasy books:");
        const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
        console.log(fantasyBooks);

        console.log("\n 2. Books after 2000:");
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
        console.log(recentBooks);

        console.log("\n 3. Books by J.K. Rowling:");
        const rowlingBooks = await books.find({ author: "J.K. Rowling" }).toArray();
        console.log(rowlingBooks);

        console.log("\n 4. Updating The Hobbit price:");
        await books.updateOne(
            { title: "The Hobbit" },
            { $set: { price: 17.99 } }
        );
        console.log("Price updated!");

        console.log("\n 5. Deleting The Catcher in the Rye:");
        await books.deleteOne({ title: "The Catcher in the Rye" });
        console.log("Book deleted!");

        //  ADVANCED QUERIES 
        console.log("\n In-stock books after 2010:");
        const inStockRecent = await books.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray();
        console.log(inStockRecent);

        console.log("\n Science Fiction books (title, author, price only):");
        const projectedBooks = await books.find(
            { genre: "Science Fiction" },
            { projection: { title: 1, author: 1, price: 1, _id: 0 } }
        ).toArray();
        console.log(projectedBooks);

        console.log("\n Books by price (cheapest first):");
        const sortedAsc = await books.find().sort({ price: 1 }).limit(3).toArray();
        console.log(sortedAsc);

        console.log("\n Books by price (most expensive first):");
        const sortedDesc = await books.find().sort({ price: -1 }).limit(3).toArray();
        console.log(sortedDesc);

        console.log("\n Page 1 (first 5 books):");
        const page1 = await books.find().limit(5).skip(0).toArray();
        console.log(page1);

        //  AGGREGATION PIPELINES
        console.log("\n Average price by genre:");
        const avgPriceByGenre = await books.aggregate([
            { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
        ]).toArray();
        console.log(avgPriceByGenre);

        console.log("\n Author with most books:");
        const authorMostBooks = await books.aggregate([
            { $group: { _id: "$author", bookCount: { $sum: 1 } } },
            { $sort: { bookCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        console.log(authorMostBooks);

        console.log("\n Books by decade:");
        const booksByDecade = await books.aggregate([
            { $group: { 
                _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
                count: { $sum: 1 } 
            }},
            { $sort: { _id: 1 } }
        ]).toArray();
        console.log(booksByDecade);

        // INDEXING
        console.log("\n Creating indexes...");
        await books.createIndex({ title: 1 });
        await books.createIndex({ author: 1, published_year: 1 });
        console.log("Indexes created!");

        console.log("\n All tasks completed sucessfully!");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

runQueries();