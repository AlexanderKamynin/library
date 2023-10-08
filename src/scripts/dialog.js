let dialog_elem = document.getElementById('dialog');

function delete_action()
{
    dialog_elem.classList.add('active');
}

function processing_yes()
{
    const delete_id = document.getElementById('delete_input').value;
    dialog_elem.classList.remove('active');

    fetch("/books/delete_action", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            delete_id: delete_id,
            agree: 'Да'
        })
    })
}

function processing_no()
{
    const delete_id = document.getElementById('delete_input').value;
    dialog_elem.classList.remove('active');

    fetch("/books/delete_action", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            delete_id: delete_id,
            agree: 'Нет'
        })
    })
}