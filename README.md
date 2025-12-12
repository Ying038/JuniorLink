# JuniorLink
# Digital Student Identity & E-Wallet

JuniorLink is a modern React Native mobile application designed to digitize the Malaysian student experience. It combines a digital Identity Card (MyKad style), a cashless payment system for schools, and a public transport travel pass into a single, secure app.

The app features a realistic **NFC payment simulation**, **Parental Controls**, and **Biometric Security** flows.

**[🔗 JuniorLink Overview](https://v0-junior-link-app-development.vercel.app/)**

## 📱 Features

* **Digital ID Card:** A realistic, holographic-style digital Student ID (MyKad design) with tilt effects.
* **e-Wallet & NFC Simulation:**
    * Simulated NFC "Tap-to-Pay" for Canteen and School Store payments.
    * Real-time transaction history and budget tracking.
* **Smart Travel Pass:**
    * Generates a dynamic **QR Code** for bus/train entry.
    * **Auto-Expiry Timer:** QR code expires after 60 seconds for security.
* **Parental Control Dashboard:**
    * Parents can set spending limits (Food vs. Travel).
    * App restrictions (e.g., Block Social Media, Limit Gaming).
    * PIN-protected parent access.
* **Biometric Security:**
    * Simulated Facial Recognition scanning animation.
    * Fingerprint authentication simulation.
* **Student Hub:** Access to Library records, Exam Results (GPA), and Club memberships.


## 🚀 How to Run the Project

Follow these steps to run the app on your own device.

### Prerequisites
1.  **Node.js:** Ensure you have [Node.js installed](https://nodejs.org/) on your computer.
2.  **Expo Go:** Download the "Expo Go" app on your iPhone (App Store) or Android (Play Store).

### Installation
1.  Clone this repository:
    ```bash
    git clone (https://github.com/Ying038/JuniorLink.git)
    cd JuniorLink
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
1.  Start the development server:
    ```bash
    npx expo start
    ```

2.  **Scan the QR Code:**
    * Open the **Expo Go** app on your phone.
    * Scan the QR code shown in your terminal.
    * The app will load on your device!

