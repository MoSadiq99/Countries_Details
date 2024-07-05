function submitSearch() {
    let searchValue = document.getElementById("countryName").value;
    window.location.href = `result.html?country=${searchValue}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const countryNameInput = document.getElementById("countryName");
    const countryCardsContainer = document.getElementById("countryCards");

    // Function to fetch and display country cards
    function fetchAndDisplayCountries() {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => {
                // Clear previous cards
                countryCardsContainer.innerHTML = '';

                data.forEach(country => {
                    // Check if the country name matches the input value (case insensitive)
                    if (country.name.common.toLowerCase().includes(countryNameInput.value.toLowerCase())) {

                       
                        // Create card element
                        let card = document.createElement("div");
                        card.classList.add("col-md-3", "mb-4");

                        // Card structure
                        card.innerHTML = `
                        <div class="card h-100 d-flex flex-column shadow">
                            <img src="${country.flags.png}" class="card-img-top flag-img" alt="Flag of ${country.name.common}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${country.name.common}</h5>
                                <p class="card-text">Capital: ${country.capital}</p>
                                <p class="card-text">Region: ${country.region}</p>
                                <p class="card-text">Population: ${country.population}</p>
                                <div class="mt-auto">
                                    <a href="${country.maps.googleMaps}" target="_blank" class="btn btn-primary">View on Google Maps</a>
                                </div>
                            </div>
                        </div>`;

                        // Add event listener to the card to redirect on click
                        card.addEventListener("click", function() {
                            window.location.href = `result.html?country=${country.name.common}`;
                        });

                        // Append card to container
                        countryCardsContainer.appendChild(card);
                    }
                });

                // If only one card is displayed, center it
                if (countryCards.children.length <= 3) {
                    countryCards.classList.add('single-card-center');
                } else {
                    countryCards.classList.remove('single-card-center');
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }

    // Call fetchAndDisplayCountries initially to load all countries
    fetchAndDisplayCountries();

    // Event listener for input change (typing)
    countryNameInput.addEventListener("input", function () {
        fetchAndDisplayCountries();
    });

    // Function to update the map iframe with the Google Maps URL
    function updateMap(gMapURL) {
        const map = document.getElementById("map");
        map.src = gMapURL;
    }

});
