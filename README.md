# Scheduling App

## Yale University YHack 2024 Project

## Overview
The Scheduling App is a web application designed to help elderly and older individuals easily manage their daily tasks and medication schedules using voice commands. This user-friendly system allows seniors to plan their day by simply speaking their tasks and medication reminders, while an AI creates a personalized daily plan.

## Features
- **Voice-Activated Task Input**: Users can add tasks and medication reminders using natural speech.
- **AI-Generated Daily Plans**: The system creates optimized daily schedules based on voice input.
- **Medication Reminders**: Customizable alerts for medication times.
- **Simple Interface**: Large, easy-to-read display suitable for seniors.
- **Audio Feedback**: Verbal confirmations and reminders for added accessibility.
- **Flexible Scheduling**: Easily adjust plans as needed using voice commands.

## Technology Stack
- Flask (Python) for backend processing
- JavaScript for frontend interactivity
- Web Speech API for voice recognition
- AI algorithms for schedule optimization
- Responsive design for various device sizes

## Usage
1. **Add Tasks**: Say "Add task" followed by the task description (e.g., "Add task: water the plants").
2. **Set Medication Reminders**: Say "Medication reminder" followed by the medication name and time (e.g., "Medication reminder: heart pills at 9 AM").
3. **View Schedule**: The daily plan is displayed in large, clear text on the main screen.
4. **Hear Reminders**: The system provides audio reminders for upcoming tasks and medications.
5. **Modify Plans**: Use voice commands to change or remove tasks as needed.

## Benefits for Seniors
- **Increased Independence**: Helps maintain daily routines without constant caregiver intervention.
- **Improved Medication Adherence**: Regular reminders help ensure medications are taken on time.
- **Reduced Cognitive Load**: AI-generated schedules help organize daily activities efficiently.
- **Enhanced Accessibility**: Voice commands eliminate the need for complex user interfaces or typing.
- **Flexible Adaptation**: Easily adjustable plans accommodate changing needs and preferences.

## Installation

1. **Clone the Repository**:
   git clone https://github.com/pawan-karthik/MedReminder-Assistant.git
   cd MedReminder-Assistant

2. **Set Up Virtual Environment** (optional but recommended):
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. **Install Dependencies**:
   (Make sure you have `Flask` and `dateparser` installed):
   pip install Flask dateparser

4. **Run the Application**:
   python app.py

5. **Access the Application**:
   Open your web browser and go to `http://127.0.0.1:5000/`.

## Usage

1. **Start Recording**:
   Click the "Start Recording" button and speak your event description followed by the time (e.g., "Take pills at 2:30 PM").
   
2. **View Current Schedule**:
   The current schedule is displayed on the main page organized by hour. Click on events to mark them as important.

3. **Show Important Events**:
   Click the "Show Important Events" button to view all marked important events.

## Important Notes
- Ensure that your browser supports the Web Speech API for voice recognition to work.
- Allow microphone access when prompted by your browser.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Acknowledgments
- Thanks to the contributors of Flask, dateparser, and the Web Speech API for making this project possible.
