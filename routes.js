const express = require("express");
const router = express.Router();
let library_books = require("./json/books.json").books;
let current_user = "Saska Kamishka";


router.get("/", (request, response) => {
    response.redirect("/books")
})

router.get("/books", (request, response) => {
    response.render("main", {
        user_name: "Saska Kamishka",
        books: library_books
    })
});


// books adding
router.get("/books/add", (request, response) => {
    response.render("add", {
        books: library_books
    });
});

// books deleting
// router.get("/books/delete", (request, response) => {

// });

// books card
//TODO: add the checks for book_id that is not exist
router.get("/books/:book_id", (request, response) => {
    response.render("book", {
        book: library_books[request.params.book_id - 1]
    });
});


router.post("/books/add_action", (request, response) => {
    let new_book = {
        "id": library_books.length + 1,
        "title": request.body.title,
        "author": request.body.author,
        "date_release": request.body.date_release,
        "image": null,
        "is_taken": false,
        "who_taken": null,
        "date_taken": null,
        "date_return": null
    };

    library_books.push(new_book);

    response.redirect("/books");
});


// books edit
router.get("/books/:book_id/edit", (request, response) => {
    let requested_book = library_books[request.params.book_id - 1]
    response.render("edit", {
        book: requested_book
    });
});


router.post("/books/:book_id/edit_action", (request, response) => {
    const book_idx = library_books.map((book) => {
        return parseInt(book.id)
    }).indexOf(parseInt(request.params.book_id));

    const body = request.body;
    if (body.title)
    {
        library_books[book_idx].title = body.title;
    }

    if (body.author)
    {
        library_books[book_idx].author = body.author;
    }

    if (body.date_release)
    {
        library_books[book_idx].date_release = body.date_release;
    }

    response.redirect("/books/" + request.params.book_id);
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

