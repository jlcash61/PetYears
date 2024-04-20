

document.addEventListener('DOMContentLoaded', function () {
    const petSpeciesSelect = document.getElementById('petSpecies');
    const petSizeSelect = document.getElementById('petSize');
    const form = document.getElementById('ageForm');
    const resultDiv = document.getElementById('result');

    const modal = document.getElementById('resultModal');
    const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
    const modalText = document.getElementById('modalText');

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    // Listen for changes in the pet species selection
    petSpeciesSelect.addEventListener('change', function() {
        // Disable the size dropdown if the selected species is 'cat'
        if (this.value === 'cat') {
            petSizeSelect.disabled = true;
            petSizeSelect.value = 'small'; // Optionally reset the size selection
        } else {
            petSizeSelect.disabled = false; // Enable size selection for other species (e.g., 'dog')
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const petAge = parseInt(document.getElementById('petAge').value);
        const petSpecies = petSpeciesSelect.value;
        const petSize = petSizeSelect.value;
        if(isNaN(petAge) || petAge <= 0) {
            resultDiv.innerText = "Please enter a valid age.";
            return;
        }
        if (!petSpecies) {
            resultDiv.innerText = "Please select a pet species.";
            return;
        }
        // Adjust the message if size is not selected but species is 'dog'
        if (!petSize && petSpecies === 'dog') {
            resultDiv.innerText = "Please select a pet size.";
            return;
        }
        const humanAge = calculatePetAgeInHumanYears(petAge, petSize, petSpecies);
        resultDiv.innerText = typeof humanAge === 'number' ? `The pet's age in human years is: ${humanAge}` : humanAge;
        modalText.innerText = typeof humanAge === 'number' ? `Your ${petSpecies.charAt(0).toUpperCase() + petSpecies.slice(1)} is ${humanAge} years old in human years.` : humanAge;

        modal.style.display = "block"; // Show the modal
    });
});



function calculatePetAgeInHumanYears(petAge, petSize) {
    if (petAge <= 0) {
        return "Please enter a valid age.";
    }

    // Adjustments based on pet size
    switch (petSize) {
        case 'small':
            if (petAge === 1) return 15;
            if (petAge === 2) return 24;
            return 24 + (petAge - 2) * 5; // Assuming small pets age a bit slower
        case 'medium':
            if (petAge === 1) return 15;
            if (petAge === 2) return 24;
            return 24 + (petAge - 2) * 6; // Medium baseline
        case 'large':
            if (petAge === 1) return 15;
            if (petAge === 2) return 24;
            return 24 + (petAge - 2) * 7; // Assuming large pets age a bit faster
        case 'giant':
            if (petAge === 1) return 15;
            if (petAge === 2) return 24;
            return 24 + (petAge - 2) * 8; // Assuming giant pets age even faster
        default:
            return "Please select a valid size.";
    }
}


