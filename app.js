// function for onclick action 
let searchBook = () => {
    let searchText = document.getElementById('searchText').value;
    // loading the api 
    let api = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(api)
        .then(res => res.json())
        .then(json => displayResult(json))
    // clearing the input field 
    document.getElementById('searchText').value = '';
    console.log(api);
}
let displayResult = books => {
    console.log(books);
    // displaying the search result 
    if (books.numFound === 0) {
        document.getElementById('booksFound').innerHTML = `<h2 class="text-danger">Sorry Your Search Returns No Matching Result</h2>`;
    }
    else {
        document.getElementById('booksFound').innerText = `Found ${books.numFound} result`;
    }
    let searchResult = document.getElementById('searchResult');
    // clearing the filed 
    searchResult.textContent = '';
    // loading the array
    booksArray = books.docs;
    // search result 20 per page 
    let booksArraySlice = booksArray;
    booksArraySlice.forEach(book => {
        // putting the results into a new div by creating one per items
        let result = document.createElement('div');
        result.classList.add('col');
        result.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
            class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6>Author: ${errorHandler(book.author_name)}</h6>
                <h6>First Puslish Year:${book.first_publish_year}</h6>
                <h6>Publisher: ${errorHandler(book.publisher)}</h6>
            </div>
        </div>`;
        // appending thee results accordingly 
        searchResult.appendChild(result);
    });
}

// additional Error handler 
let errorHandler = array => {
    if (array === undefined) {
        return 'No Data Found';
    }
    else {
        return array[0];
    }
}