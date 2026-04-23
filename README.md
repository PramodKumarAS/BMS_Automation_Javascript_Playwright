# 🎭 BMS Automation Framework — JavaScript | Playwright | Allure | MongoDB

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Playwright](https://img.shields.io/badge/Playwright-1.59.x-brightgreen?logo=playwright)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-3.x-orange)](https://allurereport.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-darkgreen?logo=mongodb)](https://www.mongodb.com/)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-yellow?logo=github-actions)](https://github.com/PramodKumarAS/BMS_Automation_Javascript_Playwright/actions)

A modern, production-grade test automation framework for the **BMS (Booking Management System)** application, built using **JavaScript**, **Playwright**, and **Allure Reports**. The framework supports **UI automation** and **API testing** with global authentication setup, environment-based configuration, JSON schema validation, and MongoDB integration.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Framework Architecture](#framework-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
- [Test Projects Breakdown](#test-projects-breakdown)
- [Reports](#reports)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)

---

## 📌 About the Project

The **BMS Playwright Automation Framework** is a scalable, JavaScript-based test automation solution for the BMS application. It is built following industry best practices including:

- **Page Object Model (POM)** for clean and maintainable UI test code
- **Global Authentication Setup** — login once, reuse auth state across all tests
- **Dual Project Architecture** — separate UI and API test projects in a single config
- **Environment-Driven Config** — base URLs and secrets managed via `.env` files
- **JSON Schema Validation** — API response structure validated using AJV
- **MongoDB Integration** — database-level test data setup and verification
- **Allure Reports** — rich, interactive HTML test reports with screenshots and videos
- **Auto Retry** — flaky tests automatically retried up to 2 times
- **GitHub Actions** — fully automated CI/CD pipeline

---

## 🛠️ Tech Stack

| Technology         | Version   | Purpose                                      |
|--------------------|-----------|----------------------------------------------|
| JavaScript         | ES2022+   | Core programming language                    |
| Playwright         | ^1.59.1   | Browser automation & API testing             |
| TypeScript (config)| —         | `playwright.config.ts` for type-safe config  |
| Allure Playwright  | ^3.7.1    | Interactive HTML test reporting              |
| dotenv             | ^17.x     | Environment variable management              |
| AJV                | ^8.18.0   | JSON schema validation for API responses     |
| ajv-formats        | ^3.0.1    | Additional format validators (date, email…)  |
| MongoDB            | ^7.0.0    | Database integration for test data           |
| Node.js            | 18+       | JavaScript runtime                           |
| GitHub Actions     | —         | CI/CD automation                             |

---

## 🏗️ Framework Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                  BMS Playwright Automation Framework                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────────────┐       ┌───────────────────────────┐      │
│   │     UI Tests          │       │       API Tests            │      │
│   │  tests/ui/            │       │   tests/api/              │      │
│   │  (Chromium browser)   │       │   (Chromium / no browser) │      │
│   └──────────┬────────────┘       └─────────────┬─────────────┘      │
│              │                                  │                    │
│              └──────────────┬───────────────────┘                    │
│                             │                                        │
│              ┌──────────────▼──────────────┐                        │
│              │     Global Auth Setup        │                        │
│              │  src/auth/global.setup.js    │                        │
│              │  (Login once → auth.json)    │                        │
│              └──────────────┬──────────────┘                        │
│                             │                                        │
│         ┌───────────────────┼──────────────────────┐                │
│         ▼                   ▼                      ▼                │
│  ┌─────────────┐   ┌────────────────┐   ┌──────────────────┐       │
│  │ Page Objects│   │   Utilities    │   │  Data / Fixtures  │       │
│  │  src/pages/ │   │  src/utils/    │   │  src/data/        │       │
│  └─────────────┘   └────────────────┘   └──────────────────┘       │
│                                                                      │
│         ┌───────────────────┬──────────────────────┐                │
│         ▼                   ▼                      ▼                │
│  ┌─────────────┐   ┌────────────────┐   ┌──────────────────┐       │
│  │  AJV Schema │   │    MongoDB     │   │  dotenv (.env)   │       │
│  │  Validation │   │  Integration   │   │  Config Mgmt     │       │
│  └─────────────┘   └────────────────┘   └──────────────────┘       │
│                                                                      │
│              ┌──────────────────────────────┐                       │
│              │         Allure Reports        │                       │
│              │  reports/allure-results/      │                       │
│              │  reports/allure-report/       │                       │
│              └──────────────────────────────┘                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
BMS_Automation_Javascript_Playwright/
│
├── .github/
│   └── workflows/
│       └── ci.yml                        # GitHub Actions CI pipeline
│
├── src/
│   ├── auth/
│   │   └── global.setup.js               # Global auth setup (login once)
│   ├── pages/                            # Page Object Model (POM) classes
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── BookingPage.js
│   ├── utils/                            # Utility & helper functions
│   │   ├── apiHelper.js                  # API request wrapper
│   │   ├── dbHelper.js                   # MongoDB connection & queries
│   │   └── schemaValidator.js            # AJV schema validation helper
│   └── data/                             # Test data & JSON schemas
│       ├── schemas/                      # AJV JSON schema definitions
│       └── testData.js                   # Shared test data constants
│
├── tests/
│   ├── ui/                               # UI test specs (Chromium)
│   │   ├── login.spec.js
│   │   ├── booking.spec.js
│   │   └── dashboard.spec.js
│   └── api/                              # API test specs
│       ├── bookings.api.spec.js
│       └── auth.api.spec.js
│
├── reports/
│   ├── allure-results/                   # Raw Allure result files
│   ├── allure-report/                    # Generated HTML Allure report
│   └── test-results/                     # Playwright trace/video output
│
├── .env                                  # Environment variables (gitignored)
├── .env.example                          # Sample env file to share safely
├── .gitignore
├── package.json                          # Dependencies & npm scripts
├── package-lock.json
├── playwright.config.ts                  # Playwright configuration
└── README.md
```

---

## ✅ Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **npm 9+** — comes bundled with Node.js
- **Allure CLI** (for viewing reports) — [Install guide](https://allurereport.org/docs/install/)
- **Git** — [Download here](https://git-scm.com/)
- **MongoDB** (if running DB tests locally) — [Download here](https://www.mongodb.com/try/download/community)

Verify installations:
```bash
node -v
npm -v
allure --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PramodKumarAS/BMS_Automation_Javascript_Playwright.git
cd BMS_Automation_Javascript_Playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:
```env
UI_BASE_URL=https://your-bms-ui-url.com
API_BASE_URL=https://your-bms-api-url.com
MONGO_URI=mongodb://localhost:27017/bms
```

---

## ⚙️ Environment Configuration

The framework uses **dotenv** to manage environment-specific configuration. All sensitive values and base URLs are stored in `.env` (never committed to Git).

| Variable        | Description                        |
|-----------------|------------------------------------|
| `UI_BASE_URL`   | Base URL for the BMS UI application|
| `API_BASE_URL`  | Base URL for the BMS REST API      |
| `MONGO_URI`     | MongoDB connection string          |

The `playwright.config.ts` loads these automatically via `dotenv.config()`.

---

## ▶️ Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run UI Tests Only

```bash
npx playwright test --project=ui-chromium
```

### Run API Tests Only

```bash
npx playwright test --project=api-chromium
```

### Run a Specific Test File

```bash
npx playwright test tests/ui/login.spec.js
```

### Run in Headed Mode (see the browser)

```bash
npx playwright test --project=ui-chromium --headed
```

### Run with Playwright UI Mode (interactive debug)

```bash
npx playwright test --ui
```

### Debug a Specific Test

```bash
npx playwright test tests/ui/login.spec.js --debug
```

---

## 🧪 Test Projects Breakdown

The `playwright.config.ts` defines two isolated test projects:

| Project         | Test Directory  | Browser   | Base URL          | Description                        |
|-----------------|-----------------|-----------|-------------------|------------------------------------|
| `ui-chromium`   | `tests/ui/`     | Chromium  | `UI_BASE_URL`     | Browser-based UI functional tests  |
| `api-chromium`  | `tests/api/`    | Chromium  | `API_BASE_URL`    | REST API tests with schema validation |

**Key Configuration Highlights:**
- **Global timeout:** 60 seconds per test
- **Retries:** 2 automatic retries on failure
- **Global Setup:** `src/auth/global.setup.js` runs once before all tests to authenticate and save auth state
- **Screenshots:** Captured automatically on failure
- **Videos:** Retained on failure for debugging
- **Output:** Saved to `reports/test-results/`

---

## 📊 Reports

This framework uses **Allure** for rich, interactive test reporting.

### Generate & View Allure Report

After running tests, generate and open the report:

```bash
# Step 1: Generate the report
npm run allure:generate

# Step 2: Open the report in browser
npm run allure:open
```

Or in a single step:
```bash
allure serve reports/allure-results
```

### What's in the Allure Report

- ✅ Pass / ❌ Fail / ⚠️ Skip summary with trend charts
- Step-by-step test execution logs
- Screenshots attached on failure
- Videos attached on failure
- API request/response details
- Test retry history
- Timeline and duration analysis

### Playwright HTML Report (built-in)

```bash
npx playwright show-report
```

---

## 🔄 CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration. The pipeline is defined in `.github/workflows/ci.yml`.

**Pipeline Triggers:**
- On every `push` to `main`
- On every `pull_request`

**Pipeline Steps:**
1. Checkout code
2. Set up Node.js 18
3. Cache npm dependencies
4. Run `npm install`
5. Install Playwright browsers (`npx playwright install --with-deps`)
6. Run all tests (`npx playwright test`)
7. Generate Allure report
8. Upload Allure report as a downloadable artifact

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Pramod Kumar A S**
- GitHub: [@PramodKumarAS](https://github.com/PramodKumarAS)

---

> ⭐ If you find this project useful, please consider giving it a star!
