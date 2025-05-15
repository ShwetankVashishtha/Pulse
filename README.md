# Pulse - Playwright Testing Framework

This repository contains the **Pulse** Playwright framework built with JavaScript for end-to-end automated testing of web applications. Pulse provides a scalable and modular architecture to create, manage, and execute reliable UI tests across multiple browsers.

## Project Overview

Pulse is designed to streamline web application testing by leveraging the power of Playwright. It supports parallel test execution, detailed reporting, and integration with modern CI/CD pipelines, helping teams maintain high quality and fast feedback cycles.

## Table of Contents

- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running Tests](#running-tests)  
- [Test Structure](#test-structure)  

## Prerequisites

Before running the tests, ensure the following are installed:

- **Node.js** (version 16.0.0 or higher)  
- **npm** or **yarn** (package managers)  

Playwright dependencies and browsers will be installed during setup.

## Installation

1. Clone this repository:

        git clone https://github.com/your-username/pulse.git
        cd pulse

2. Install project dependencies:

        npm install

3. Install Playwright browsers:

        npx playwright install

## Running Tests
    
To run the tests, simply execute the following command:

        npm test

This will start the Playwright test runner and execute all tests.

Running Specific Tests
    To run a specific test file or test suite, you can use:

        npx playwright test tests/your-test-file.spec.js

## Test Structure

The test files are located in the tests directory. Each test file contains Playwright scripts that automate browser interactions for different parts of the application platform.

Example of a basic test structure:

/root  
  /commons  
  ├── Navigation.spec.js          # Functions for the app redirections  
  ├── PulseUtils.spec.js          # Common / generic functions  

  /pages  
  ├── EntryPage.spec.js           # Functions for the entry page  

  /tests  
  ├── EntryTests.spec.js          # Test for login/logout/signup functionality  

├── package-lock.json            # Package lock JSON  
├── package.json                 # Package JSON  
├── playwright.config.js         # Playwright configurations  
├── README.md                    # Project details

Each .spec.js file in /tests folder contains a set of tests for the corresponding part of the platform, including:

UI interactions: Clicking buttons, filling forms, etc.
Assertions: Validating page content, URLs, and other elements.
Testing: Ensuring pages load quickly and correctly.