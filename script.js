// Fetch data from the JSON file and dynamically populate the timeline
async function loadTimeline() {
    try {
        const response = await fetch('timeline-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        const timeline = document.getElementById('timeline');

        const timelineStart = Math.min(...events.map(e => e.start));
        const timelineEnd = Math.max(...events.map(e.end));
        const timelineRange = timelineEnd - timelineStart;

        events.forEach(event => {
            // Create a bar for each event
            const eventBar = document.createElement('div');
            eventBar.className = 'timeline-event';
            eventBar.style.backgroundColor = event.color;

            // Calculate position and width
            const startPercent = ((event.start - timelineStart) / timelineRange) * 100;
            const widthPercent = ((event.end - event.start) / timelineRange) * 100;
            eventBar.style.left = `${startPercent}%`;
            eventBar.style.width = `${widthPercent}%`;

            // Add label
            const label = document.createElement('span');
            label.className = 'event-label';
            label.innerText = `${event.event} (${event.start} - ${event.end})`;
            eventBar.appendChild(label);

            timeline.appendChild(eventBar);
        });
    } catch (error) {
        console.error('Failed to load timeline data:', error);
    }
}

// Call the function to load the timeline
loadTimeline();
