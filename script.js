// Fetch data from the JSON file and dynamically populate the timeline
async function loadTimeline() {
    try {
        const response = await fetch('timeline-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        const timeline = document.getElementById('timeline');

        const baseStart = -4000; // 4000 BC
        const baseEnd = 2100; // 2100 AD
        const timelineRange = baseEnd - baseStart;

        events.forEach(event => {
            // Create a bar for each event
            const eventBar = document.createElement('div');
            eventBar.className = 'timeline-event';
            eventBar.style.backgroundColor = event.color;

            // Calculate position and width
            const startPercent = ((event.start - baseStart) / timelineRange) * 100;
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

        // Add base timeline line
        const baseTimelineLine = document.createElement('div');
        baseTimelineLine.className = 'base-timeline-line';
        timeline.appendChild(baseTimelineLine);

    } catch (error) {
        console.error('Failed to load timeline data:', error);
    }
}

// Call the function to load the timeline
loadTimeline();
