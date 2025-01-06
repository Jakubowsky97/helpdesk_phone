# HelpDesk Phone Simulator

A web-based phone simulator designed for the Helpdesk system at magico.pro. This tool allows simulating a phone in the browser, providing a convenient way to test the web panel without the need for physical phone calls. The app supports syncing with the server, handling various phone statuses, and managing the phonebook.

## Features

- **Phone Status Synchronization**: Handles multiple phone states such as idle, ringing, and off-hook.
- **Incoming Call Simulation**: Simulates incoming calls to test response handling.
- **Server Synchronization**: Syncs the phone status with the server to reflect real-time changes.

## Technologies Used

- **React**: For building the front-end of the simulator.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Bootstrap**: For responsive design and layout.
- **JavaScript**: For application logic and dynamic interactions.
- **CSS**: For custom styling and design.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Jakubowsky97/helpdesk_phone.git
   ```
2. Navigate to the project directory:
```bash
cd helpdesk_phone
```
3. Install the required dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```
5. Open the browser and visit http://localhost:3000 to see the app in action.

## Usage

Once the app is running, you can interact with the simulated phone interface:

- **Idle State**: The phone will be idle until a call comes in.
- **Ringing State**: The phone will display a ringing status when an incoming call is detected.
- **Off-hook State**: When the user picks up the call, the phone will switch to the off-hook state.
You can also test the phonebook synchronization by adding or removing contacts.
