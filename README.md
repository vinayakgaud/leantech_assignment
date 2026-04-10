# Test Automation Suite – Lean Tech

## Overview

This project is a **production-ready end-to-end test automation suite** built using Playwright to validate the Swag Labs platform.

It simulates a realistic user journey:

* Select 3 random products
* Add items to cart
* Complete checkout
* Verify successful order placement

The suite is designed with **scalability, reliability, and observability** in mind.

---

## Tech Stack

* **Playwright** – End-to-End Testing
* **TypeScript** – Type Safety & Maintainability
* **Allure** – Advanced Test Reporting
* **PNPM** – Fast Package Management

## Dependencies
```
* "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@types/node": "^25.5.2",
    "allure-commandline": "^2.38.1",
    "allure-playwright": "2.0.0-beta.19"
  },
* "dependencies": {
    "dotenv": "^17.4.1"
  }
```
---

## Project Structure

```
tests/              → Test scenarios
pages/              → Page Object Models (POM)
fixtures/           → Shared test setup & context
storage/            → Auth/session state

reports/
  ├── playwright-report/   → Playwright HTML report
  ├── allure-results/      → Raw Allure results
  ├── allure-report/       → Final Allure report
  └── test-artifacts/      → Debug artifacts
       ├── test-name/
       │    ├── trace.zip
       │    ├── video.webm
       │    └── screenshot.png
```

---

## Setup Instructions

### 1. Install dependencies

```bash
pnpm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

---

## Environment Setup

Create a `.env` file using `.env.example`:

```
BASE_URL=
STANDARD_USER=
USER_PASSWORD=
```

---

## Running Tests

### Run all tests

```bash
pnpm test
```

### Headed mode

```bash
pnpm test:headed
```

### Debug mode

```bash
pnpm test:debug
```

### Interactive UI mode

```bash
pnpm test:ui
```

---

## Debugging

### Open Playwright report

```bash
pnpm playwright:report
```

### Open trace file

```bash
pnpm trace:open reports/test-artifacts/<test-folder>/trace.zip
```

---

## Test Reporting

### Recommended (One Command)

```bash
pnpm test:allure
```

This will:

* Clean old reports
* Run tests
* Generate Allure report
* Open report in browser

---

### Manual Steps

```bash
pnpm test
pnpm allure:generate
pnpm allure:open
```

---

## Configuration Highlights

* Parallel execution (local)
* Single worker in CI
* Retry mechanism enabled
* Trace collection on retry
* Screenshots & videos on failure
* Multiple browser support

---

## Test Coverage

* E2E complete user checkout flow
* Login and logout validation
* Inventory:
  1. Inventory is visible, along with all inventory item is present
  2. User can add item to cart and cart count is increased
  3. User can add and remove item from cart and cart count is increased and decreased accordingly
* Cart:
  1. User can remove item from cart and navigate back to continue shopping
* Checkout:
  1. User can cancel the checkout process and navigate back to cart

---

## Design Principles

### Page Object Model (POM)

* Clean separation of concerns
* Reusable UI interactions

### Fixtures

* Centralized setup
* Reduced test duplication

### Randomization

* Prevents hardcoded test bias
* Improves robustness

### Reporting Strategy

* **Playwright Report** → Debugging
* **Allure Report** → Analytics & visibility

---

## Future Enhancements

* CI/CD integration (GitHub Actions)
* Allure history & trend tracking
* Visual regression testing
* API + UI hybrid testing

---

## Notes

* Focused on core functional flows (positive scenarios)
* Cross-browser support configured (not prioritized)
* Designed to scale into enterprise-grade automation pipelines

---
