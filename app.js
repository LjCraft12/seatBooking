const container = document.querySelector('.container'),
    seats = document.querySelectorAll('.row .seat:not(.occupied)'),
    count = document.getElementById('count'),
    total = document.getElementById('total'),
    selectedMovie = document.getElementById('movie');

// Add plus sign to selected movie value to make it a number
let ticketPrice = +selectedMovie.value;

populateUI();


// Get data from localStorage and populate the DOM
function populateUI() {
    // Retrieve selected seats from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // Check if selectedSeats is not equal to null and the length of selecteSeats is greater than 0
    if (selectedSeats !== null && selectedSeats.length > 0) {
        // Loop thru selectedSeats from localStorage and check that their index is greater than -1 (-1 meaning its not there)
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                // Add the selected class to the seats from local storage
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        // Set the selected movie to the selectedMovieIndex from localStorage
        selectedMovie.selectedIndex = selectedMovieIndex;
    }
}

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

const updateSelectedCountAndTotal = () => {
    // Grab all seats that the user selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Create a new array of the selected seats
    // Map array and return new array of indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // Add selected seats to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Convert the node list from the querySelectorAll to a number of its length
    const selectedSeatsCount = selectedSeats.length;

    // Get the number of user selected seats and add it to the count in the DOM
    count.innerText = selectedSeatsCount;

    // Take the total number of user selected seats and multiply the price of the ticket by the number of seats selected and add it to the total in the DOM
    total.innerText = selectedSeatsCount * ticketPrice;
};

// Check for selected movie
selectedMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCountAndTotal();
});

// Add even listener to the container
container.addEventListener('click', e => {
    // Check if the clicked item in the DOM has a class of seat and it does not contain a class of occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        // Update the selected number of seats and total ticket prices
        updateSelectedCountAndTotal()
    }
});

// Initialize count and total
updateSelectedCountAndTotal();