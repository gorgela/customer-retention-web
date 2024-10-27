document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navbar a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetUrl = this.getAttribute('href');

            document.body.classList.add('fade');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300); 
        });
    });

    // Perform search when the button is clicked
    document.querySelector('.search-button').addEventListener('click', performSearch);

    // Initialize the map
    initMap();
});

function performSearch() {
    const searchInput = document.querySelector('.search-bar').value;

    if (searchInput) {
        alert(`Searching for: ${searchInput}`);
        // Optionally, redirect to a search results page
        // window.location.href = `search.html?query=${encodeURIComponent(searchInput)}`;
    } else {
        alert('Please enter a search term.');
    }
}


class Map {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.367445, 124.866988], 18);


myMap.loadMarkersFromJson('map.json');
