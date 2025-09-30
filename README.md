# MongoDB Assignment - PLP Bookstore

##  Assignment Overview
This project demonstrates MongoDB fundamentals including CRUD operations, aggregation pipelines, and indexing for a bookstore database.

## File Structure
 mongodb-wk1/
├──  insert_books.js
├──  queries.js  
├──  README.md
├──  screenshot.png
├──  package.json
└──  package-lock.json

##  Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation
1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
   
### Configuration
Update the connection string in both JavaScript files with your MongoDB Atlas credentials:

1. Get your connection string from MongoDB Atlas
2. Replace the connection string in insert_books.js and queries.js:
```javascript
const uri = "mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/";
```

### Running The Application
``` bash
# 1. Insert sample book data
node insert_books.js

# 2. Run all MongoDB queries
node queries.js
```

## Files
- insert_books.js - Script to populate the database with sample book data
- queries.js - Contains all MongoDB queries for the assignment
- screenshot.png - Screenshot of the database in MongoDB Atlas
- package.json - Project dependencies

## Dabatase Structure
- Database: plp_bookstore
- Collection: books
- Fields: title, author, genre, published_year, price, in_stock, pages, publisher

## Author
Natalie Awinja
@Keli281
