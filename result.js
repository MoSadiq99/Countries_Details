
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const countryName = params.get("country");

    let officialName = document.getElementById("officialName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");
    let capital = document.getElementById("capital");
    let map = document.getElementById("map");

    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const country = data[0];
                    officialName.innerText = country.name.official;
                    name.innerText = country.name.common;
                    capital.innerText = country.capital ? country.capital[0] : 'N/A';
                    img.innerHTML = `<img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="img-fluid">`;

                    // Populate additional details
                    populateDetail("Area", country.area);
                    populateDetail("Population", country.population);
                    populateDetail("Region", country.region);
                    populateDetail("Subregion", country.subregion);
                    populateDetail("Timezone", country.timezones[0]);

                    // Assuming you have fetched the country data and obtained the Google Maps URL
                    const gMapURL = country.maps.googleMaps;

                    // Function to update the map iframe with the Google Maps URL
                    function updateMap(gMapURL) {
                        if (gMapURL) {
                            // Replace goo.gl/maps with www.google.com/maps/embed?pb=
                            const embedURL = gMapURL.replace("https://goo.gl/maps/", "https://www.google.com/maps/embed?pb=");
                            map.src = embedURL;
                        } else {
                            map.src = ""; // Clear the iframe if no valid URL is provided
                        }
                    }

                    // Call the function to update the map with the fetched Google Maps URL
                    updateMap(gMapURL);


                } else {
                    officialName.innerText = "Country not found";
                    name.innerText = "";
                    capital.innerText = "";
                    img.innerHTML = "";
                    map.src = "";
                }
            })
            .catch(err => {
                officialName.innerText = "Error fetching data";
                name.innerText = "";
                capital.innerText = "";
                img.innerHTML = "";
                map.src = "";
                console.error(err);
            });
    } else {
        officialName.innerText = "No country specified";
        name.innerText = "";
        capital.innerText = "";
        img.innerHTML = "";
        map.src = "";
    }

    function populateDetail(label, value) {
        const detailContainer = document.createElement("div");
        detailContainer.classList.add("row");
        detailContainer.innerHTML = `
            <div class="col-md-6">
                <h5>${label}:</h5>
            </div>
            <div class="col-md-6">
                <h5 class="text-end">${value}</h5>
            </div>
        `;
        document.querySelector(".card-body").appendChild(detailContainer);
    }
});