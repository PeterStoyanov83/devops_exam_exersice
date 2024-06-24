## Deployment to Render

### Prerequisites
1. Ensure you have access to the Render dashboard.
2. Obtain your Render API Key and Service ID.

### Steps to Deploy

1. **Set up GitHub Secrets**:
   - Go to your GitHub repository.
   - Navigate to `Settings` > `Secrets and variables` > `Actions`.
   - Add a new secret `RENDER_API_KEY` with your Render API Key.

2. **GitHub Actions Workflow**:
   - Ensure your `.github/workflows/deploy.yml` is configured correctly.
   - Example configuration:

     ```yaml
     name: Deploy to Render

     on:
       push:
         branches:
           - main

     jobs:
       deploy:
         runs-on: ubuntu-latest

         steps:
         - name: Checkout repository
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'

         - name: Install dependencies
           run: npm install

         - name: Install Playwright Browsers
           run: npx playwright install

         - name: Start server
           run: |
             nohup npm start &
             echo $! > server.pid

         - name: Wait for server to be ready
           run: sleep 15

         - name: Run unit tests
           run: npm run test:unit

         - name: Run UI tests
           run: npm run test:ui

         - name: Stop server
           run: |
             if [ -f server.pid ]; then
               kill $(cat server.pid)
             fi

         - name: Deploy to Render
           env:
             RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
           run: |
             curl -X POST \
             -H 'Accept: application/json' \
             -H 'Authorization: Bearer ${{ secrets.RENDER_API_KEY }}' \
             -H 'Content-Type: application/json' \
             -d '{"serviceId": "srv-cprurtl6l47c73dsrq1g", "clearCache": false}' \
             https://api.render.com/v1/services/srv-cprurtl6l47c73dsrq1g/deploys
     ```

3. **Trigger Deployment**:
   - Push changes to the `main` branch to trigger the deployment.

### Step 2: Configure Continuous Integration (CI)

- Ensure the GitHub Actions workflow includes steps for running unit and UI tests, and deploying the application.
- Validate the CI pipeline by pushing changes and verifying that all steps are executed correctly.

### Step 3: Monitor and Verify Deployment

- After deployment, check the Render dashboard to ensure the application is running without errors.
- Set up any necessary monitoring or logging to track application health.

### Step 4: Update README

- Update the `README.md` file with setup, test, and deployment instructions.
- Example README section for deployment:

```markdown
## Deployment

### Prerequisites
1. Access to Render dashboard.
2. Render API Key and Service ID.

### Steps
1. Set up GitHub Secrets:
   - Add `RENDER_API_KEY` in GitHub repository settings.
2. Trigger Deployment:
   - Push changes to `main` branch.

Refer to `.github/workflows/deploy.yml` for the CI/CD pipeline configuration.
