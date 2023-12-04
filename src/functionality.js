document.getElementById('selectButton').addEventListener('click', function() {
    var names = document.querySelectorAll('#studentList li');
    var nameArray = Array.from(names).map(function(li) { return li.textContent; });

    var remainingNames = nameArray.filter(function(name) {
        return !document.getElementById('dynamicDigit').textContent.includes(name);
    });

    if (remainingNames.length > 0) {
        var randomIndex = Math.floor(Math.random() * remainingNames.length);
        var selectedName = remainingNames[randomIndex];
        var originalIndex = nameArray.indexOf(selectedName);
        animateName(selectedName, originalIndex);
    } else {
        alert("All students have been selected!");
    }
});

function animateName(name, index) {
    var displayElement = document.getElementById('dynamicDigit');
    var targetName = name.split('');
    var currentDisplay = new Array(targetName.length).fill('-');
    var timers = [];
    var animationDuration = 2000;
    var revealDelay = 200;

    function revealCharacter(characterIndex) {
        if (characterIndex < targetName.length) {
            currentDisplay[characterIndex] = targetName[characterIndex];
            displayElement.textContent = currentDisplay.join('');

            // Check if this is the last character
            if (characterIndex === targetName.length - 1) {
                addToCompletedList(name);
                removeFromOriginalList(index);
            }
        }
    }

    targetName.forEach(function(_, index) {
        timers[index] = setInterval(() => {
            currentDisplay[index] = Math.floor(Math.random() * 10).toString();
            displayElement.textContent = currentDisplay.join('');
        }, 100);

        setTimeout(() => {
            clearInterval(timers[index]);
            revealCharacter(index);
        }, animationDuration + index * revealDelay);
    });
}

function addToCompletedList(name) {
    var doneList = document.getElementById('studentList-done');
    var newListItem = document.createElement('li');
    newListItem.textContent = name;
    doneList.appendChild(newListItem);
}

function removeFromOriginalList(index) {
    var originalList = document.getElementById('studentList');
    if (originalList.children[index]) {
        originalList.removeChild(originalList.children[index]);
    }
}