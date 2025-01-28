// Fetch data from the JSON file and dynamically populate the horizontal timeline
async function loadTimeline() {
    try {
        const response = await fetch('timeline-data.json');
        const events = await response.json();
        const timeline = document.getElementById('timeline');

        events.forEach((event, index) => {
            // Create a marker for each event
            const marker = document.createElement('div');
            marker.className = 'timeline-marker';
            marker.style.left = `${(index + 1) * 20}%`; // Spread markers evenly

            const content = `
                <div class="marker-label">
                    <strong>${event.event}</strong>
                    <p>${event.start} - ${event.end}</p>
                </div>
            `;

            marker.innerHTML = content;
            timeline.appendChild(marker);
        });
    } catch (error) {
        console.error('Failed to load timeline data:', error);
    }
}

// Call the function to load the timeline
loadTimeline();
