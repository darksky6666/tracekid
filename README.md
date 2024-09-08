<br/>
<div align="center">
<a href="https://github.com/darksky6666/tracekid">
<img style="border-radius:20%;" class="rounded-image" src="./assets/images/icon.png" alt="Logo" width="100" height="100">
</a>
<br/><br/>

![Platform - iOS](https://img.shields.io/badge/platform-iOS-blue.svg)
![Platform - iOS](https://img.shields.io/badge/platform-android-red.svg)
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

