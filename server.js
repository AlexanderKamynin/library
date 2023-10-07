const server = require("express")(); // Создали сервер
server.set("view engine", "pug");
server.set("views", "./src/views");

const routes = require("./routes");
server.use("/", routes);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server working using ${PORT} port on http://localhost:3000/`);
});

