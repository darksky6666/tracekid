<br/>
<div align="center">
<a href="https://github.com/darksky6666/tracekid">
<img style="border-radius:20%;" class="rounded-image" src="./assets/images/icon.png" alt="Logo" width="100" height="100">
</a>
<br/><br/>

![Platform - iOS](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform - Android](https://img.shields.io/badge/platform-android-red.svg)

<p style="font-weight: bold;">Made with:</p>
<a style="padding-right: 8px;" href="https://reactnative.dev/" target="_blank" rel="noreferrer"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40"/>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<br/>
</div>

## 🗺️ Trace Kid
[![Build](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml/badge.svg)](https://github.com/darksky6666/tracekid/actions/workflows/build-apk.yml)
[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

A tracer application for tracing devices.

## 🔽 Download

You can download the most recent version of Trace Kid from
[here](https://github.com/darksky6666/tracekid/releases/latest).  

## 🏗️ Build

1. **Install NodeJS and JDK 17:** <br/>
   
   [NodeJS](https://nodejs.org) <br />
   [JDK](https://www.azul.com/downloads/?version=java-17-lts&os=windows&architecture=x86-64-bit&package=jdk#zulu)

2. **Navigate to project directory and install npm dependencies:**
   
   ```sh
    cd tracekid
    npm install
   ```

3. **Run prebuild and build project:**
   ```sh
   npx expo prebuild
   cd android && ./gradlew assembleRelease
   ```
   **Or use Expo Go:**
   ```sh
   npm run start
   ```

