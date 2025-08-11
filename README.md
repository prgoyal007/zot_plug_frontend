# ZotPlug Frontend

## 📦 Tech Stack

### Web

* **Framework:** React / Next.js / react-native-web
* **Styling:** Tailwind CSS
* **Tooling:** TypeScript / ESLint

### Mobile

* **Framework:** React / Expo / react-native
* **Styling:** CSS / nativewind
* **Tooling:** TypeScript

---

## ⚙️ Prerequisites

* [Node.js](https://nodejs.org/) vXX+
* [npm](https://www.npmjs.com/)

---

## 🚀 Getting Started

### Web Development

```bash
cd web
npm install
npm run dev
```

### Mobile Development

#### 1. Download Simulators

* **Android SDK (Android Dev)**

  * [Android SDK Setup Guide](https://docs.expo.dev/workflow/android-studio-emulator/)
* **iOS Simulator (iOS Dev – Requires macOS)**

  * [iOS Simulator Setup Guide](https://docs.expo.dev/workflow/ios-simulator/)

#### 2. Install Packages & Run Simulator

```bash
cd mobile
npm install
npm run android   # or: npm run ios
```

#### 3. Copy env.example -> .env, while in ./mobile DIR
```bash
# Open .env, and change it to your local IP
API_URL=http://YOUR_LOCAL_IP:4000
```

## 💻⚙️Dev Workflow

#### 1. Launch the backend
  * Start the backend server by following the steps in our [Platform Dev Workflow](https://github.com/KChun510/zot_plug_platform?tab=readme-ov-file#%EF%B8%8Fsoftware-development-workflow:~:text=%F0%9F%92%BB%E2%9A%99%EF%B8%8FSoftware%20Development%20Workflow)

#### 2. Launch the web or mobile environment
```bash
# Web Dev
cd web
npm run dev

# Mobile dev
cd mobile
npm run android
```






