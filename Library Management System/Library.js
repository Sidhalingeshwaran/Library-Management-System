let input = document.getElementById("searchInput");
let resultContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let error = document.getElementById("errorMsg");

function createAndAppendSearchResult(result) {
    let {
        imageLink,
        author
    } = result;

    let div = document.createElement("div");
    div.classList.add("col-6", "mb-4", "text-center");

    let innerContainer = document.createElement("div");
    div.appendChild(innerContainer);

    let image = document.createElement("img");
    image.src = imageLink;
    image.alt = "Book cover";
    image.style.height = "150px"; // optional styling
    innerContainer.appendChild(image);

    let authorName = document.createElement("p");
    authorName.textContent = author;
    authorName.classList.add("spinner");
    innerContainer.appendChild(authorName);

    div.appendChild(innerContainer);
    resultContainer.appendChild(div);
}

function displayResults(search_Result) {
    spinnerEl.classList.add("d-none");
    resultContainer.textContent = ""; // Clear previous results

    if (search_Result.length === 0) {
        error.textContent = "No results found";
        error.classList.add("error");
    } else {
        error.textContent = "";
        let h1 = document.createElement("h1");
        h1.textContent = "Popular Books";
        resultContainer.appendChild(h1);

        for (let result of search_Result) {
            createAndAppendSearchResult(result);
        }
    }
}

function getbooks(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        resultContainer.textContent = "";
        error.textContent = "";

        let searchValue = input.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchValue;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData; // fixed key name
                displayResults(search_results);
            });
    }
}

input.addEventListener("keydown", getbooks);