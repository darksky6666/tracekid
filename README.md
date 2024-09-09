<br/>
<div align="center">
<a href="https://github.com/darksky6666/tracekid">
<img style="border-radius:20%;" class="rounded-image" src="./assets/images/icon.png" alt="Logo" width="100" height="100">
</a>
<br/><br/>

![Platform - iOS](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform - Android](https://img.shields.io/badge/platform-android-red.svg)

<p style="font-weight: bold;">Built with ❤️</p>
<a style="padding-right: 15px;" href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<br/>
</div>

## 🗺️ Trace Kid
[![Build](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml/badge.svg)](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml)
[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

A tracer application for tracing devices.
<br/>

## 🔽 Download

You can download the most recent version of Trace Kid from
[here](https://github.com/darksky6666/tracekid/releases/latest).  
<br/>

## 📝 ToDo

- [ ] Bottom Navigation Bar
- [x] Page 1 - Splash screen
- [ ] Page 2 - Map
- [ ] Page 3 - Profile
- [ ] Page 4 - Settings
- [ ] Page 5 - Tracker Options

## 🏗️ Build

1. **Install NodeJS, Android SDK and JDK 17:** <br/>
   
   [NodeJS](https://nodejs.org) <br />
   [JDK](https://www.azul.com/downloads/?version=java-17-lts&os=windows&architecture=x86-64-bit&package=jdk#zulu) <br />
   [Android SDK](https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local)

2. **Navigate to project directory and install npm dependencies:**
   
   ```sh
    cd tracekid
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
