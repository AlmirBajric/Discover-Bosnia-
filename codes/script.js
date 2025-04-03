// Smooth Scroll for Links
// Select all anchor links starting with "#" and add a click event listener
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior (instant jump to the section)
        // Scroll smoothly to the section referenced by the href attribute
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth', // Enable smooth scrolling animation
        });
    });
});

// Highlight Active Section in Navbar
// Add an event listener for the scroll event
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Select all sections
    const navLinks = document.querySelectorAll('.nav-link'); // Select all navigation links

    let current = ''; // Variable to store the current section in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Get the top position of the section
        if (window.pageYOffset >= sectionTop - 60) { // Check if section is in view
            current = section.getAttribute('id'); // Get the id of the current section
        }
    });

    // Update the active class on navbar links based on the current section
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove the active class from all links
        if (link.getAttribute('href') === `#${current}`) { // Match the href with the current section id
            link.classList.add('active'); // Add the active class to the matching link
        }
    });
});

// City Description Navigation
document.addEventListener("DOMContentLoaded", () => {
    const cityDescriptions = { // Object containing city descriptions
        "sarajevo": "Sarajevo, the capital of Bosnia, is a city of cultural and historical significance. Known for its Ottoman-era architecture, vibrant bazaars, and the site of the 1984 Winter Olympics.",
        "mostar": "Mostar is famous for its iconic Stari Most (Old Bridge), a UNESCO World Heritage Site that symbolizes unity and resilience.",
        "banja-luka": "Banja Luka is renowned for its green spaces, rivers, and historical landmarks, such as the Kastel Fortress.",
        "tuzla": "Tuzla is known for its salt lakes, vibrant cultural scene, and being a center of industry and education in Bosnia.",
        "zenica": "Zenica is an industrial city along the Bosna River, celebrated for its steel production and natural surroundings.",
        "travnik": "Travnik boasts Ottoman-era architecture, colorful mosques, and the stunning Travnik Fortress overlooking the town."
    };

    const cityButtons = document.querySelectorAll(".city-link"); // Select all city buttons
    const cityDescription = document.getElementById("city-description"); // Get the description container

    // Add click event listeners to each city button
    cityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const city = button.dataset.city; // Get the city name from the data attribute
            cityDescription.textContent = cityDescriptions[city]; // Update the description dynamically
        });
    });
});

// Modal Gallery Functionality
document.addEventListener("DOMContentLoaded", () => {
    const openGalleryButton = document.getElementById('open-gallery'); // Get the "Images" button
    const modal = document.getElementById('gallery-modal'); // Get the modal element
    const closeButton = document.querySelector('.close-button'); // Get the close button
    const cityButtons = document.querySelectorAll('.city-button'); // Select all buttons inside the modal

    // Open the modal when the "Images" button is clicked
    openGalleryButton.addEventListener('click', () => {
        modal.style.display = 'block'; // Display the modal
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    // Close the modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) { // Check if the click is outside the modal content
            modal.style.display = 'none'; // Hide the modal
        }
    });

    // Navigate to the respective city's HTML page
    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url'); // Get the URL from the data attribute
            window.location.href = url; // Redirect to the city's page
        });
    });
});
    // Data for the table
    document.addEventListener("DOMContentLoaded", () => {
        const tableData = [
            { city: 'Sarajevo', population: '275,000', attraction: 'Historical Sites', area: '141.5 km²' },
            { city: 'Mostar', population: '105,000', attraction: 'Stari Most', area: '117.4 km²' },
            { city: 'Banja Luka', population: '185,000', attraction: 'Green Spaces', area: '123.0 km²',},
            { city: 'Tuzla', population: '110,000', attraction: 'Salt Lakes', area: '303.0 km²'},
            { city: 'Zenica', population: '115,000', attraction: 'Industrial Hub', area: '558.5 km²' },
            { city: 'Travnik', population: '60,000', attraction: 'Ottoman Heritage', area: '529.7 km²'}
        ];
    
        const tableBody = document.getElementById("context-table-body");
        const contextHeader = document.getElementById("context-header");
    
        const buttons = {
            population: document.getElementById("population-btn"),
            attraction: document.getElementById("attraction-btn"),
            area: document.getElementById("area-btn"),
        };
    
        const updateTable = (context) => {
            tableBody.innerHTML = ""; // Clear table body
            contextHeader.textContent = context.charAt(0).toUpperCase() + context.slice(1); // Update header text
    
            tableData.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="py-2 px-4 border-b font-semibold">${row.city}</td>
                    <td class="py-2 px-4 border-b">${row[context]}</td>
                `;
                tableBody.appendChild(tr);
            });
        };
    
        // Add event listeners to each button
        Object.keys(buttons).forEach(context => {
            buttons[context].addEventListener("click", () => updateTable(context));
        });
    
        // Initialize the table with population data
        updateTable("population");
    });
    document.addEventListener("DOMContentLoaded", () => {
        const citySelector = document.getElementById("city-selector");
        const addCityBtn = document.getElementById("add-city-btn");
        const itineraryList = document.getElementById("itinerary-list");
        const saveItineraryBtn = document.getElementById("save-itinerary-btn");
        const clearItineraryBtn = document.getElementById("clear-itinerary-btn");
    
        const cityDetails = {
            "Sarajevo": { population: "275,524", attraction: "Baščaršija" },
            "Mostar": { population: "104,518", attraction: "Stari Most" },
            "Banja Luka": { population: "185,042", attraction: "Kastel Fortress" },
            "Tuzla": { population: "110,979", attraction: "Pannonian Salt Lakes" },
            "Zenica": { population: "110,663", attraction: "Vranduk Fortress" },
            "Travnik": { population: "57,393", attraction: "Old Town Fortress" }
        };
    
        const itinerary = [];
    
        // Add a city to the itinerary
        addCityBtn.addEventListener("click", () => {
            const selectedCity = citySelector.value;
            if (!selectedCity || itinerary.includes(selectedCity)) return;
    
            itinerary.push(selectedCity);
            renderItinerary();
        });
    
        // Render the itinerary
        function renderItinerary() {
            itineraryList.innerHTML = ""; // Clear the list
            itinerary.forEach((city, index) => {
                const li = document.createElement("li");
                li.className = "mb-2 p-2 border-b flex justify-between items-center";
    
                li.innerHTML = `
                    <div>
                        <strong>${city}</strong><br>
                        Population: ${cityDetails[city].population}<br>
                        Attraction: ${cityDetails[city].attraction}
                    </div>
                    <button class="remove-btn text-red-600" data-index="${index}">Remove</button>
                `;
                itineraryList.appendChild(li);
            });
    
            // Add remove functionality
            document.querySelectorAll(".remove-btn").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const index = e.target.getAttribute("data-index");
                    itinerary.splice(index, 1);
                    renderItinerary();
                });
            });
        }
    
        // Save the itinerary
        saveItineraryBtn.addEventListener("click", () => {
            alert(`Your itinerary has been saved successfully and you choose following cities: ${itinerary.join(", ")}`);
        });
    
        // Clear the itinerary
        clearItineraryBtn.addEventListener("click", () => {
            itinerary.length = 0;
            renderItinerary();
        });
    });
    
    

    
