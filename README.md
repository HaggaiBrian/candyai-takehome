# candyai-takehome

This is a case study automation task for the Candy AI staging app, using Playwright with TypeScript for end-to-end testing.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HaggaiBrian/candyai-takehome.git
cd candyai-takehome
```

### 2. Install all dependencies
```npm install```

```npx playwright install```

```npm install --save-dev @types/node```

```npm install --save-dev @faker-js/fake```

### 3. Project structure
```.
├── src/
│   ├── tests/
│   │   └── test.ts
│   ├── helpers/
│   │   └── helpers.ts       
│   └── page-objects/
│       └── page.ts
├── node_modules/
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### 4. Environment Variables
To securely store sensitive data like login credentials etc, create a .env file in the project root.
Steps
1. Copy .env.template
2. Paste it at same root level
3. Rename copied file to .env
4. Open renamed file to access.
5. Edit file by replacing the XXXXXX with the correct values for ACCESS_KEY, EMAIL and PASSWORD.
6. These details can be found in the email you sent.

### 5. Running tests
```npm test```
This will run tests in headless mode (NO UI displayed)

```npm run test:headed```
This wil run tests in ui mode (UI to be shown)

if we had multiple test files, this would apply. if with multiple test file, this how to run one test file
```npx playwright test src/tests/ai-chat.spec.ts```

### 6. Reporting
By default, the configured test reporting using default playwright test results folder and addition of screenshot capture on failure. No reporting tools added for purposes of timing. This file is auto generated and not included in git, hence gitignore

### 7. Proof of running tests
This is a proof of concept for the running tests. its basically a screenshot indicating that all tests are passing correctly as expected.
![alt text](<Screenshot 2025-07-31 at 10.26.00.png>)
