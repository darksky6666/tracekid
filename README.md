<br/>
<div align="center">
<a href="https://github.com/darksky6666/tracekid">
<img style="border-radius:20%;" class="rounded-image" src="./assets/images/icon.png" alt="Logo" width="100" height="100">
</a>
<br/><br/>

![Platform - iOS](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform - Android](https://img.shields.io/badge/platform-android-red.svg)

<p style="font-weight: bold;">Built with ❤️</p>

<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="padding-right: 15px; border: none;">
      <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
        <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/>
      </a>
    </td>
    <td style="padding-right: 15px; border: none;">
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
      </a>
    </td>
    <td style="padding-right: 15px; border: none;">
      <a href="https://zustand-demo.pmnd.rs/" target="_blank" rel="noreferrer">
        <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" alt="zustand" width="40" height="40"/>
      </a>
    </td>
    <td style="border: none;">
      <a href="https://www.sqlite.org/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg" alt="sqlite" width="40" height="40"/>
      </a>
    </td>
  </tr>
</table>

<br/>
</div>

## 🗺️ Trace Kid

[![Build](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml/badge.svg)](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml)
[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![CodeFactor](https://www.codefactor.io/repository/github/darksky6666/tracekid/badge)](https://www.codefactor.io/repository/github/darksky6666/tracekid)

A tracer application for tracing devices.
<br/>

## 🔽 Download

[![Release](https://img.shields.io/github/release/darksky6666/tracekid.svg)](https://github.com/darksky6666/tracekid/releases/latest)

You can download the most recent version of Trace Kid from
[here](https://github.com/darksky6666/tracekid/releases/latest).  
<br/>

## 📝 ToDo


- [x] Bottom Navigation Bar
- [x] Page 1 - Splash screen
- [x] Page 2 - Home Page
- [x] Page 3 - Menu
- [x] Page 4 - My Device
- [ ] Page 5 - Help & Feedback
- [ ] Page 6 - Shop
- [x] Page 7 - Notification
- [ ] Page 8 - Profile
- [ ] Page 9 - Add Device
- [x] ~~Page 10 - Map~~
- [ ] Page 11 - Bluetooth
- [x] ~~Page 12 - Find My~~
- [x] Page 13 - Setting

<br/>

## 🏗️ Build

1. **Install NodeJS, Android SDK and JDK 17:** <br/>
   
   [NodeJS](https://nodejs.org) <br />
   [JDK](https://www.azul.com/downloads/?version=java-17-lts&os=windows&architecture=x86-64-bit&package=jdk#zulu) <br />
   [Android SDK](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local)

2. **Navigate to project directory and install npm dependencies:**
   
   ```sh
    npm install
   ```

3. **Run prebuild and build project:**
   **Android Device:**
   ```sh
   npx expo prebuild
   cd android && ./gradlew assembleRelease
   ```
   **Or use Expo Run:**
   ```sh
   npx expo run:android
   ```
   **IOS Device:**
   ```sh
   npx expo start -g
   ```
