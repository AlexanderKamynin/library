const express = require("express");
const router = express.Router();
library_books = require("./json/books.json");


// index.html (main page)
router.get("/", (request, response) => {
    response.render("main", {
        user_name: "Saska Kamishka",
        books: library_books.books
    })
});


// books 
router.get("/books/:book_id", (request, response) => {
    response.render("book", {
        book: library_books.books[request.params.book_id - 1]
    });
});


// get the style from files
router.get("/src/style/:filename", (request, response) => {
    response.sendFile(__dirname + "/src/style/" + request.params.filename);
});


// for other pages
router.get("*", (request, response)=>{
    response.status(404); // Ошибка – нет такой страницы
    response.end("Page not found");
});


module.exports = router

