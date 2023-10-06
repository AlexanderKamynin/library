const server = require("express")(); // Создали сервер
server.set("view engine", "pug");
server.set("views", "./src/views");

library_books = require("./json/books.json");

server.get("/", (request, response) => {
    response.render("main", {
        user_name: "Saska Kamishka",
        books: library_books.books
    })
})

server.get("/src/style/:filename", (request, response) => {
    response.sendFile(__dirname + "/src/style/" + request.params.filename);
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server working using ${PORT} port on http://localhost:3000/`);
})