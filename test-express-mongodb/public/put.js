let update = document.getElementById('update');
let deleting = document.getElementById('delete'); 

update.addEventListener('click', function() {
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Darth Vador',
            'quote': 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log(data);
        window.location.reload(true);
    })
});


deleting.addEventListener('click', function() {
    fetch('quotes',  {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Darth Vador'
        })
    })
    .then(res => {
        if (res.ok) return res.json();
    })
    .then(data => {
        console.log(data);
        window.location.reload(true);
    })
})



