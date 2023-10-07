const server = require("express")(); // Создали сервер

const body_parser = require("body-parser");
server.use(body_parser.urlencoded({ extended: true }));

server.set("view engine", "pug");
server.set("views", "./src/views");

const routes = require("./routes");
server.use("/", routes);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server working using ${PORT} port on http://localhost:3000/`);
});

//TODO: 
//1) фильтрация книг
//2) возможность взять книгу пользователем; 
//3) оповещение об успешных операциях
//4) проверка работоспособности на всех вариантах
//5) добавление css 