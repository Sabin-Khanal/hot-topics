/**
 * Hot Topics Website - Main JavaScript
 * Handles dynamic content loading from HTML partials
 */

// GET THE REFERENCES
const container = document.getElementById('content-container');
const links = document.querySelectorAll('.nav-link');
let url = './partials/home.html'; // Default page to load

// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
const loadContent = (urlFeed) => {
    /*
    IMPORTANT NOTES:
    loadContent RUNS EVERY TIME A LINK IS CLICKED.
    loadContent REQUIRES THE INPUT. THIS INPUT IS
    THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK.
    EVERY TIME A LINK IS CLICKED, urlFeed WILL GET 
    THE UPDATED PATH TO THE REQUESTED CONTENT.
    */
    
    // Show loading state
    container.innerHTML = '<div class="loading">Loading content...</div>';
    
    // RUN THE fetch(urlFeed).then().then().catch()
    fetch(urlFeed)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the loaded content into the container
            container.innerHTML = data;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error loading content:', error);
            container.innerHTML = `
                <div class="error-message">
                    <p><i class="fas fa-exclamation-triangle"></i> Sorry, we couldn't load the content.</p>
                    <p>Please try again later.</p>
                </div>
            `;
        });
};

// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL
const selectContent = (event) => {
    // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG
    event.preventDefault();
    
    // GET THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK
    const clickedLink = event.target;
    const hrefValue = clickedLink.getAttribute('href');
    
    // Update active state on navigation links
    links.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
    
    // CALL THE FUNCTION loadContent PROVIDING THE href
    // VALUE OF THE CLICKED LINK AS THE VALUE FOR THE PARAMETER
    // OF loadContent FUNCTION.
    loadContent(hrefValue);
};

// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER!
links.forEach(link => {
    link.addEventListener('click', selectContent);
});

// CALL loadContent WITH THE CURRENT VALUE OF url
// This loads the default page (home) when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    loadContent(url);
});
