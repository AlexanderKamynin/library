const books_container = document.querySelector(".books");

function processing_filter()
{
    filter_type = document.getElementById("filter_type").value;

    fetch("/books/filter_action", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filter_type: filter_type
        })
    }).then(res => res.json()).then((library_books_filtered) => {
        //console.log(library_books_filtered);
        books_container.innerHTML = `<p>Список книг</p>`;

        books_container.innerHTML += "<ul>" + library_books_filtered.map(
            book => `<li><a href="/books/${book.id}">${book.id}: ${book.title} (автор: ${book.author}, год: ${book.date_release})</a></li>`
        ).join("") + "</ul>";
    })
}