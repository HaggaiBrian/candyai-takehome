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
```bash 
npm install
```

```bash
npx playwright install
```

```bash
npm install --save-dev @types/node
```

```bash
npm install --save-dev @faker-js/fake
```

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
Launch terminal and enter any of the commands below.
```bash
npm test
```
This will run tests in headless mode (NO UI displayed)

```bash
npm run test:headed
```
This wil run tests in ui mode (UI to be shown)

### 6. Reporting
By default, the configured test reporting using default playwright test results folder and addition of screenshot capture on failure. No reporting tools added for purposes of timing. This file is auto generated and not included in git, hence gitignore

### 7. Proof of running tests
This is a proof of concept for the running tests. its basically a screenshot indicating that all tests are passing correctly as expected.
![alt text](<Screenshot 2025-07-31 at 12.27.15.png>)

### 8. WHY
 **Send and receive a chat message:**  
   This covers the core user flow where a user sends a message and receives an AI-generated response.  
   - *Why?* This is a business-critical flow as it represents the main interaction users have with the AI chat.  
   - *Risk:* If broken, users cannot communicate with the AI, leading to severe UX degradation and lost trust hence rendering the platform not reliable and doing its intended goal.

**Use the "place call":**  
   This Automates placing a call through the AI Chat feature (e.g., triggering a call action or similar business-critical call flow).  
   - *Why?* Calls are a critical business function — enabling direct communication is essential for user engagement and revenue..  
   - *Risk:* If this flow is broken, it could block vital user interactions and cause major business disruption.

### 9. Assumptions and setup conditions
- It was important to hide the login credentials. The reason is that these are secret and its important to prevent risk of hackers. So we hid it under secrets
- Since we were dealing with a paid and logged in user, each test required to be setup with a login of to the interface before executing the tests
