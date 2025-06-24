document.addEventListener('DOMContentLoaded', () => {
    const cheeseData = [
        { id: 'cheddar', name: 'Cheddar', region: 'Somerset, England', coords: { x: 550, y: 1111 }, description: 'One of the world\'s most popular cheeses, originating from the village of Cheddar in Somerset. It\'s a hard, tangy, and often nutty cheese, varying in sharpness with age.' },
        { id: 'stilton', name: 'Stilton', region: 'Nottinghamshire, England', coords: { x: 688, y: 940 }, description: 'A famous English blue cheese with a strong, rich flavor. It has a characteristic crumbly texture and is one of the few British cheeses granted PDO status.' },
        { id: 'wensleydale', name: 'Wensleydale', region: 'North Yorkshire, England', coords: { x: 565, y: 679 }, description: 'A creamy, crumbly cheese with a mild, slightly sweet flavor. Traditionally made in the Wensleydale area of North Yorkshire.' },
        { id: 'red-leicester', name: 'Red Leicester', region: 'Leicestershire, England', coords: { x: 670, y: 970 }, description: 'A distinctive orange-red cheese, known for its crumbly texture and mild, slightly sweet, and nutty flavor. Often compared to Cheddar but with a mellower profile.' },
        { id: 'lancashire', name: 'Lancashire', region: 'Lancashire, England', coords: { x: 564, y: 833 }, description: 'A traditional English cheese with a moist, crumbly texture and a rich, buttery flavour. Comes in different types like Creamy, Crumbly, and Tasty Lancashire.' },
        { id: 'caerphilly', name: 'Caerphilly', region: 'South Wales', coords: { x: 514, y: 1057 }, description: 'A moist, crumbly white cheese with a fresh, slightly lemony flavour, originally from South Wales. It was popular with coal miners for its refreshing qualities.' },
        { id: 'single-gloucester', name: 'Single Gloucester', region: 'Gloucestershire, England', coords: { x: 557, y: 1028 }, description: 'A semi-hard, unpressed cheese, traditionally made from the milk of Old Gloucester cows. It has a mild, sweet, and nutty flavour with PDO status.' },
        { id: 'cheshire', name: 'Cheshire', region: 'Cheshire, England', coords: { x: 572, y: 912 }, description: 'One of England\'s oldest cheeses, known for its dense, crumbly texture and mild, salty flavor. It can be white or colored with annatto.' },
        { id: 'cornish-yarg', name: 'Cornish Yarg', region: 'Cornwall, England', coords: { x: 394, y: 1200 }, description: 'A distinctive semi-hard cheese wrapped in nettle leaves, giving it a unique appearance and a delicate, slightly earthy flavor. The name "Yarg" is "Gray" spelled backwards.' },
        { id: 'sage-derby', name: 'Sage Derby', region: 'Derbyshire, England', coords: { x: 640, y: 937 }, description: 'A marbled cheese infused with sage, giving it a unique green pattern and a delicate, herbaceous flavor. It\'s a visually striking and aromatic cheese.' },
        { id: 'colchester-blue', name: 'Colchester Blue', region: 'Essex, England', coords: { x: 809, y: 1032 }, description: 'A rich, creamy blue cheese from Essex, often with a pungent aroma and a deep, complex flavour profile.' },
        { id: 'scottish-cheddar', name: 'Scottish Cheddar', region: 'South-West/Central Lowlands, Scotland', coords: { x: 473, y: 523 }, description: 'A robust and often sharper cheddar-style cheese, typically aged to develop a strong, tangy flavour. A staple of Scottish dairies.' },
        { id: 'caboc', name: 'Caboc', region: 'Highlands of Scotland', coords: { x: 464, y: 375 }, description: 'A rich, creamy, and slightly tangy Scottish cheese made from double cream, traditionally rolled in toasted oats. It\'s one of Scotland\'s oldest cheeses.' },
        { id: 'cashel-blue', name: 'Cashel Blue', region: 'County Tipperary, Ireland', coords: { x: 194, y: 952 }, description: 'Ireland\'s original farmhouse blue cheese. It\'s a soft, creamy, and mild blue cheese with a distinctive tangy finish, often described as mellow.' },
        { id: 'golden-cross', name: 'Golden Cross', region: 'East Sussex, England', coords: { x: 756, y: 1139 }, description: 'A fresh, soft goat\'s cheese from Sussex, often log-shaped and dusted with ash, developing a delightful creamy texture and subtle goat flavour.' },
        { id: 'baron-bigod', name: 'Baron Bigod', region: 'Suffolk, England', coords: { x: 835, y: 975 }, description: 'An artisanal Brie-style cheese made from raw Montbeliarde cow\'s milk in Suffolk. It has a rich, buttery flavour with earthy, mushroomy notes and a bloomy rind.' },
        { id: 'dorset-blue-vinney', name: 'Dorset Blue Vinney', region: 'Dorset, England', coords: { x: 588, y: 1143 }, description: 'A traditional, crumbly blue cheese with a pungent aroma and strong, spicy flavour. It has PDO status and is unique to Dorset.' }
    ];

    const mapContainer = document.querySelector('.map-container');
    const cheeseMarkersDiv = document.getElementById('cheese-markers');
    const infoPanel = document.getElementById('info-panel');
    const cheeseListUl = document.getElementById('cheese-list');

    // Function to display cheese details in the info panel
    function displayCheeseDetails(cheese) {
        infoPanel.innerHTML = `
            <div class="cheese-details">
                <h3>${cheese.name}</h3>
                <p><strong>Region:</strong> ${cheese.region}</p>
                <p>${cheese.description}</p>
                <button id="backToList">Back to List</button>
            </div>
        `;
        document.getElementById('backToList').addEventListener('click', generateCheeseList);
    }

    // Function to highlight active cheese
    function setActiveCheese(id) {
        // Remove active class from all markers and list items
        document.querySelectorAll('.cheese-marker').forEach(marker => marker.classList.remove('active'));
        document.querySelectorAll('#cheese-list li').forEach(item => item.classList.remove('active'));

        // Add active class to the selected marker and list item
        const marker = document.getElementById(`marker-${id}`);
        const listItem = document.getElementById(`list-item-${id}`);
        if (marker) marker.classList.add('active');
        if (listItem) listItem.classList.add('active');
    }

    // Function to generate cheese markers on the map
    function generateMarkers() {
        cheeseData.forEach(cheese => {
            const marker = document.createElement('div');
            marker.classList.add('cheese-marker');
            marker.id = `marker-${cheese.id}`;
            marker.style.left = `${cheese.coords.x}px`;
            marker.style.top = `${cheese.coords.y}px`;
            // Optional: Add a number to the marker if desired
            // marker.textContent = cheeseData.indexOf(cheese) + 1;
            marker.addEventListener('click', () => {
                displayCheeseDetails(cheese);
                setActiveCheese(cheese.id);
            });
            cheeseMarkersDiv.appendChild(marker);
        });
    }

    // Function to generate the list of cheeses
    function generateCheeseList() {
        infoPanel.innerHTML = `
            <h2>Select a Cheese</h2>
            <p>Click on a cheese marker on the map to learn more, or select from the list below:</p>
            <ul id="cheese-list">
                </ul>
        `;
        const currentCheeseListUl = document.getElementById('cheese-list'); // Get the newly created ul
        cheeseData.forEach(cheese => {
            const listItem = document.createElement('li');
            listItem.id = `list-item-${cheese.id}`;
            listItem.textContent = cheese.name;
            listItem.addEventListener('click', () => {
                displayCheeseDetails(cheese);
                setActiveCheese(cheese.id);
            });
            currentCheeseListUl.appendChild(listItem);
        });
        setActiveCheese(null); // Clear any active selections when returning to list
    }

    // Initial load: generate markers and the cheese list
    generateMarkers();
    generateCheeseList();
});