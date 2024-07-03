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
                        card.classList.add("col");

                        // Card structure
                        card.innerHTML = `
                            <div class="card h-100 md-3">
                                <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
                                <div class="card-body">
                                    <h5 class="card-title">${country.name.common}</h5>
                                    <p class="card-text"><strong>Capital:</strong> ${country.capital}</p>
                                    <p class="card-text"><strong>Region:</strong> ${country.region}</p>
                                    <p class="card-text"><strong>Population:</strong> ${country.population}</p>
                                    <a href="${country.maps.googleMaps}" class="btn btn-primary" target="_blank">View on Google Maps</a>
                                </div>
                            </div>
                        `;

                        // Append card to container
                        countryCardsContainer.appendChild(card);
                    }
                });
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

});
