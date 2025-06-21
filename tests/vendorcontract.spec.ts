
import { test, expect } from '@playwright/test';

// Test data from CSV
const testData = {
  login: {
    email: 'naveen.s+fsm@moolya.com',
    password: 'Test@123'
  },
  contract: {
    title: 'test',
    description: 'test',
    type: 'Planned',
    vendor: 'naveen_vendor'
  },
  service: {
    name: 'Clean and Disinfect Service',
    jobPlan: 'Naveen_Jobplan',
    units: '2',
    rate: '20'
  }
};

// Test Case 1: Login with valid credentials (CRITICAL Priority)
test('#TES1 Login with valid credentials', async ({ page }) => {
  // Step 1: Navigate to login URL
  await page.goto('https://app.facilio.com/identity/login?redirect=%2Ffsm');

  // Step 2: Enter valid email
  await page.getByRole('textbox', { name: 'Enter your email address' }).click();
  await page.getByRole('textbox', { name: 'Enter your email address' }).fill(testData.login.email);

  // Step 3: Click Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // Step 4: Enter valid password
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(testData.login.password);

  // Step 5: Click Sign in
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Step 6: Verify URL (Acceptance Criteria: User should be redirected to dispatch homepage)
  await expect(page).toHaveURL('https://app.facilio.com/fsm/home/dispatch');
});

//Test Case 2: Create a new vendor contract (HIGH Priority)
test('#TES2 Create a new vendor contract', async ({ page }) => {
  // Step 1: Login (prerequisite)
  await page.goto('https://app.facilio.com/identity/login?redirect=%2Ffsm');
  await page.getByRole('textbox', { name: 'Enter your email address' }).fill(testData.login.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(testData.login.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://app.facilio.com/fsm/home/dispatch');

  // Step 2: Navigate to Vendor Contract
  await page.locator('div:nth-child(6) > .css-60yl7d > .flex').click();
  await page.locator('#f-popover-9').getByRole('link', { name: 'Vendor Contract' }).click();

  // Step 3: Click 'New Vendor Contract'
  await page.getByRole('button', { name: 'New Vendor Contract' }).click();

  // Step 4: Fill all required fields
  // Title
  await page.getByRole('textbox', { name: 'Input your text here' }).click();
  await page.getByRole('textbox', { name: 'Input your text here' }).fill(testData.contract.title);

  // Description
  await page.getByRole('textbox', { name: 'Type your description here' }).click();
  await page.getByRole('textbox', { name: 'Type your description here' }).fill(testData.contract.description);

  // Type
  await page.locator('#dsm-form-type').getByRole('textbox', { name: 'Select an option' }).click();
  await page.locator('div').filter({ hasText: new RegExp(`^${testData.contract.type}$`) }).nth(2).click();

  // Vendor
  await page.locator('#dsm-form-vendor').getByRole('textbox', { name: 'Select an option' }).click();
  await page.getByText(testData.contract.vendor).click();

  // Start Date
  await page.locator('#dsm-form-startDate').getByRole('textbox', { name: 'MM/DD/YYYY' }).click();
  await page.locator('tr:nth-child(3) > td > .css-145x2gk > .css-5ph8dp > .css-60yl7d').first().click();

  // End Date
  await page.locator('#dsm-form-endDate').getByRole('textbox', { name: 'MM/DD/YYYY' }).click();
  await page.locator('tr:nth-child(7) > td:nth-child(2) > .css-145x2gk > .css-5ph8dp > .css-60yl7d').click();

  // Location
  await page.getByRole('textbox', { name: 'Select one or more options' }).click();
  await page.locator('div').filter({ hasText: /^#209 Rag & Bone: Melrose$/ }).nth(2).click();

  // Step 5: Submit the form
  await page.locator('.dsm-section-container > div:nth-child(9)').click();

  // Acceptance Criteria: Contract should be created and visible in the list
  // Note: This needs verification step to check if contract appears in list
  await expect(page.getByText('May Contract')).toBeVisible();
});

// Test Case 3: Add service to vendor contract (HIGH Priority)
test('#TES3 Add service to vendor contract', async ({ page }) => {
  // Prerequisites: Login and navigate to existing contract
  await page.goto('https://app.facilio.com/identity/login?redirect=%2Ffsm');
  await page.getByRole('textbox', { name: 'Enter your email address' }).fill(testData.login.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(testData.login.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://app.facilio.com/fsm/home/dispatch');

  await page.locator('div:nth-child(6) > .css-60yl7d > .flex').click();
  await page.locator('#f-popover-9').getByRole('link', { name: 'Vendor Contract' }).click();

  // Step 1: Open existing/new contract
  await page.getByText('May Contract').click();

  // Step 2: Click 'New Service'
  await page.getByRole('button', { name: 'New Service' }).click();

  // Step 3: Fill service details
  // Service selection
  await page.getByRole('textbox', { name: 'Select' }).nth(2).click();
  await page.getByText(testData.service.name).click();

  // Job Plan
  await page.getByRole('textbox', { name: 'Select', exact: true }).click();
  await page.getByText(testData.service.jobPlan).click();

  // Units
  await page.getByPlaceholder('Enter Here').click();
  await page.getByPlaceholder('Enter Here').fill(testData.service.units);

  // Additional unit fields
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('02');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('02');

  // Rate configuration
  await page.getByText('Rate Per Unit').click();
  await page.getByPlaceholder('Enter Estimated Units').click();
  await page.getByPlaceholder('Enter Estimated Units').fill(testData.service.units);
  await page.getByPlaceholder('Enter Unit Rate').click();
  await page.getByPlaceholder('Enter Unit Rate').fill(testData.service.rate);

  // Step 4: Click 'Save'
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // Acceptance Criteria: Service should be added and listed under contract
  // Note: Add verification to check if service appears in the contract
});

// Test Case 4: Unpublish a contract (MEDIUM Priority)
test('#TES4 Unpublish a contract', async ({ page }) => {
  // Prerequisites: Login and navigate to published contract
  await page.goto('https://app.facilio.com/identity/login?redirect=%2Ffsm');
  await page.getByRole('textbox', { name: 'Enter your email address' }).fill(testData.login.email);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill(testData.login.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('https://app.facilio.com/fsm/home/dispatch');

  await page.locator('div:nth-child(6) > .css-60yl7d > .flex').click();
  await page.locator('#f-popover-9').getByRole('link', { name: 'Vendor Contract' }).click();

  // Step 1: Locate contract (assuming it exists and is published)
  // Step 2: Click on publish status
  await page.locator('.css-tyy2ou').click();

  // Step 3: Select 'Un Publish'
  await page.locator('text=Un Publish').click();

  // Acceptance Criteria: Contract should show as unpublished
  // Note: Add verification to check unpublished status
});
