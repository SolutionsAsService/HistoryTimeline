// Fetch data from the JSON file and dynamically populate the timeline
async function loadTimeline() {
    try {
        const response = await fetch('timeline-data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        const timeline = document.getElementById('timeline');
        const markers = document.getElementById('markers');

        const baseStart = -4000; // 4000 BC
        const baseEnd = 2100; // 2100 AD
        const timelineRange = baseEnd - baseStart;
        const eventTypes = {
            "historical": 0,
            "cultural": 1,
            "scientific": 2,
            "political": 3
        };

        // Add markers to the base timeline
        for (let year = baseStart; year <= baseEnd; year += 500) {
            const marker = document.createElement('div');
            marker.className = 'marker';
            const leftPercent = ((year - baseStart) / timelineRange) * 100;
            marker.style.left = `${leftPercent}%`;
            marker.innerText = year >= 0 ? year : `${Math.abs(year)} BC`;
            markers.appendChild(marker);
        }

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

            // Position based on event type
            const topOffset = eventTypes[event.eventType] * 40; // space out by 40px
            eventBar.style.top = `${topOffset}px`;

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
        
        // Add zoom and scroll functionality
        const timelineWrapper = document.querySelector('.timeline-wrapper');
        let scale = 1;
        timelineWrapper.addEventListener('wheel', function(event) {
            event.preventDefault();
            if (event.ctrlKey) {
                scale += event.deltaY * -0.01;
                scale = Math.min(Math.max(0.5, scale), 3);
                timeline.style.transform = `scale(${scale})`;
                markers.style.transform = `scale(${scale})`;
            } else {
                timelineWrapper.scrollLeft += event.deltaY;
            }
        });

    } catch (error) {
        console.error('Failed to load timeline data:', error);
    }
}

// Call the function to load the timeline
loadTimeline();
