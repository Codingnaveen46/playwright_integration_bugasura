# Playwright Integration with Bugasura

This repository demonstrates how to integrate Playwright, a powerful end-to-end testing framework, with Bugasura, a bug tracking tool. The integration streamlines the process of reporting and tracking bugs found during automated testing.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Reporting Bugs to Bugasura](#reporting-bugs-to-bugasura)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides an example of how Playwright test results can be integrated with Bugasura to automatically create bug reports for failed test cases, improving QA workflow efficiency.

## Features

- Automated end-to-end testing using Playwright
- Automatic bug reporting to Bugasura from test failures
- Example test cases for demonstration
- Easy configuration and setup
- Single command to run all tests, generate reports, and upload failures to Bugasura

## Prerequisites

- Node.js (v14 or above)
- npm or yarn package manager
- Bugasura account (for API integration)
- (Optional) Playwright browsers installed

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Codingnaveen46/playwright_integration_bugasura.git
cd playwright_integration_bugasura
npm install
# or
yarn install
```

## Configuration

1. **Bugasura API Setup**:  
   Create a `.env` file in the root directory and add your Bugasura API credentials:

   ```env
   BUGASURA_API_KEY=your_bugasura_api_key
   BUGASURA_PROJECT_ID=your_project_id
   ```

2. **Playwright Configuration**:  
   Modify `playwright.config.js` as needed for your application under test.

## Usage

### Run All Tests, Generate Report, and Upload to Bugasura

To run all tests, generate the report, and upload failures to Bugasura in a single command, use:

```bash
npm test
```

**Note:**  
- The `test` script in your `package.json` is configured to execute all tests, generate a test report, and automatically upload failed test details as bug reports to Bugasura.
- Check the terminal output or logs for Bugasura ticket IDs linked to failed test cases.

## Reporting Bugs to Bugasura

When a test fails, the integration script will automatically:

- Collect the failed test details
- Format the bug data
- Send a request to Bugasura's API to log the bug

Check the logs/output for Bugasura ticket IDs.

## Project Structure

```
playwright_integration_bugasura/
├── tests/                   # Playwright test files
├── utils/                   # Utility scripts (e.g., Bugasura integration)
├── playwright.config.js     # Playwright config file
├── package.json
├── .env                     # Environment variables (not committed)
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

**Note:** Replace API credentials and configuration details with your actual values. For Bugasura API documentation, visit [Bugasura API Docs](https://api-docs.bugasura.io/) (if available).
