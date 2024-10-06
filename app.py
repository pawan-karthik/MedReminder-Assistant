from flask import Flask, render_template, request, jsonify
import re
from datetime import datetime, timedelta
import dateparser

app = Flask(__name__)

# Store events
events = []

# Check if the new event conflicts with existing ones
def check_conflict(new_event_time, duration=1):
    new_end_time = new_event_time + timedelta(hours=duration)
    for event in events:
        if new_event_time < event["end"] and new_end_time > event["start"]:
            return event
    return None

# Recommend a new time if there is a conflict
def recommend_new_time():
    if events:
        latest_event = max(events, key=lambda x: x['end'])
        return latest_event['end'] + timedelta(hours=1)
    else:
        return datetime.now()

# Function to parse events from input
def parse_events(input_text):
    event_pattern = r"([A-Za-z\s]+) at (\d{1,2}[:.]?\d{0,2}\s?(?:AM|PM|am|pm|a\.m\.|p\.m\.))"
    matches = re.findall(event_pattern, input_text, re.IGNORECASE)
    
    event_list = []
    
    for match in matches:
        description = match[0].strip()
        time_str = match[1].strip()
        event_time = dateparser.parse(time_str)
        if event_time:
            event_list.append({"description": description, "time": event_time})
    
    return event_list

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Route for scheduling events
@app.route('/schedule', methods=['POST'])
def schedule():
    input_text = request.json.get('events')
    event_list = parse_events(input_text)
    response = []
    
    for event in event_list:
        event_time = event["time"]
        conflict = check_conflict(event_time)
        if conflict:
            new_time = recommend_new_time()
            response.append({
                "message": f"Conflict found with '{conflict['description']}' from {conflict['start'].strftime('%I:%M %p')} to {conflict['end'].strftime('%I:%M %p')}. Suggested new time for '{event['description']}': {new_time.strftime('%I:%M %p')}"
            })
        else:
            event_end = event_time + timedelta(hours=1)
            events.append({"description": event["description"], "start": event_time, "end": event_end})
            events.sort(key=lambda x: x['start'])  # Sort events by start time
            response.append({
                "message": f"Event '{event['description']}' scheduled from {event_time.strftime('%I:%M %p')} to {event_end.strftime('%I:%M %p')}."
            })

    return jsonify(response)

# Route for getting the current schedule
@app.route('/current_schedule', methods=['GET'])
def current_schedule():
    schedule = {}
    for hour in range(24):  # Create a schedule for 24 hours
        schedule[hour] = []
    
    for event in events:
        start_hour = event['start'].hour
        schedule[start_hour].append(event)

    return jsonify(schedule)

if __name__ == '__main__':
    app.run(debug=True)