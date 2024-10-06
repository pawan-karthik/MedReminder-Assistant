let importantEvents = []; // Array to store important events

// Function to speak a message using the Web Speech API
function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
}

// Event listener for the Start Recording button
document.getElementById("start-record-btn").addEventListener("click", function() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById("result").innerHTML = `<strong>Recognized speech:</strong> ${transcript}`;
        scheduleEvents(transcript);
    };

    recognition.onerror = function(event) {
        console.error("Error occurred in recognition: " + event.error);
        speak("Sorry, there was an error with the speech recognition. Please try again.");
    };
});

// Function to schedule events via AJAX
function scheduleEvents(transcript) {
    fetch('/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: transcript })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML += "<h3>Scheduling Results:</h3>"; // Add a header for clarity

        data.forEach(item => {
            resultDiv.innerHTML += `<div class="message">${item.message}</div>`;
            speak(item.message); // Speak the scheduling results
        });

        loadCurrentSchedule(); // Reload the current schedule after adding events
    })
    .catch((error) => {
        console.error('Error:', error);
        speak("Sorry, there was an error scheduling your events.");
    });
}

// Load current schedule and update the calendar
function loadCurrentSchedule() {
    fetch('/current_schedule')
    .then(response => response.json())
    .then(schedule => {
        const calendarDiv = document.getElementById("calendar");
        calendarDiv.innerHTML = ""; // Clear existing calendar

        for (let hour = 0; hour < 24; hour++) {
            const hourDiv = document.createElement("div");
            hourDiv.className = "col-1 text-center border p-2";
            hourDiv.style.backgroundColor = schedule[hour].length > 0 ? "red" : "green"; // Color based on occupancy
            hourDiv.innerHTML = `<strong>${hour}:00</strong><br>${schedule[hour].map(event => {
                return `<span class="event" data-description="${event.description}" data-time="${hour}">${event.description}</span>`;
            }).join('<br>') || 'No events'}`;

            hourDiv.addEventListener('mouseover', function() {
                const events = hourDiv.querySelectorAll('.event');
                events.forEach(event => {
                    event.style.cursor = 'pointer';
                    event.style.textDecoration = 'underline';
                    event.addEventListener('click', function() {
                        const description = event.getAttribute('data-description');
                        const time = event.getAttribute('data-time');

                        // Check if the event is already marked as important
                        const isImportant = importantEvents.some(e => e.description === description && e.time === time);

                        if (!isImportant) {
                            importantEvents.push({ description, time });
                            speak(`Event '${description}' marked as important.`);
                        } else {
                            speak(`Event '${description}' is already marked as important.`);
                        }
                    });
                });
            });

            calendarDiv.appendChild(hourDiv);
        }
    })
    .catch((error) => {
        console.error('Error loading schedule:', error);
        speak("Sorry, there was an error loading the current schedule.");
    });
}

// Event listener for Show Important Events button
document.getElementById("show-important-btn").addEventListener("click", function() {
    const importantDiv = document.getElementById("important-events");
    importantDiv.innerHTML = ""; // Clear previous important events
    if (importantEvents.length === 0) {
        importantDiv.innerHTML = "<strong>No important events selected.</strong>";
    } else {
        importantEvents.forEach(event => {
            importantDiv.innerHTML += `<div>${event.description} at ${event.time}:00</div>`;
        });
    }
});

