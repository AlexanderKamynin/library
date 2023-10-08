const express = require("express");
const router = express.Router();
let library_books = require("./json/books.json").books;


let remove_idx = -1;


router.get("/", (request, response) => {
    response.redirect("/books")
})

router.get("/books", (request, response) => {
    response.render("main", {
        user_name: "noname",
        books: library_books
    })
});


// books adding
router.get("/books/add", (request, response) => {
    response.render("add", {
    });
});

router.post("/books/add_action", (request, response) => {
    let new_book = {
        "id": library_books.length + 1,
        "title": request.body.title,
        "author": request.body.author,
        "date_release": request.body.date_release,
        "is_taken": false,
        "who_taken": null,
        "date_taken": null,
        "date_return": null
    };

    library_books.push(new_book);

    response.redirect("/books/add");
});


// books deleting
router.get("/books/delete", (request, response) => {
    response.render("delete", {
    })
});


router.post("/books/delete_action", (request, response) => {
    remove_idx = library_books.map((book) => {
        return parseInt(book.id);
    }).indexOf(parseInt(request.body.delete_id));

    if (remove_idx === -1)
    {
        response.send(`Id не существует или введен некорректно: ${request.body.delete_id}`);
    }
    else
    {
        if (request.body.agree === "Да")
        {
            library_books.splice(remove_idx, 1);
            remove_idx = -1;
        }

        response.redirect("/books/delete");
    }
})


// books card
router.get("/books/:book_id([0-9]{1,})", (request, response) => {
    response.render("book", {
        book: library_books[request.params.book_id - 1]
    });
});


// books edit
router.get("/books/:book_id([0-9]{1,})/edit", (request, response) => {
    let requested_book = library_books[request.params.book_id - 1]
    response.render("edit", {
        book: requested_book
    });
});


router.post("/books/:book_id([0-9]{1,})/edit_action", (request, response) => {
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

