---
name: QA Test Checklist
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

name: "🧪 QA Test Checklist"
description: "Use this checklist to perform QA validation for a feature or release"
title: "[QA] Test: <feature_name>"
labels: ["QA", "Testing"]
body:
  - type: markdown
    attributes:
      value: |
        ## 🧾 QA Test Checklist  
        Select the test scenario and complete the checklist below.

  - type: dropdown
    id: scenario
    attributes:
      label: Test Scenario
      description: Choose the feature/test scenario to validate
      options:
        - Login
        - Signup / Registration
        - Profile Update
        - Password Reset
        - Shopping Cart / Checkout
        - Search Functionality
        - Notifications
        - Settings / Preferences
        - Reporting / Dashboard
        - Other

  - type: textarea
    id: test_summary
    attributes:
      label: Test Summary
      description: Briefly describe the scope of the test
      placeholder: "Testing login functionality with valid and invalid credentials."

  - type: checkboxes
    id: functional
    attributes:
      label: Functional Testing
      options:
        - All buttons, links, and forms work correctly
        - Validation messages display as expected
        - Data is saved/retrieved correctly
        - Navigation between pages works

  - type: checkboxes
    id: ui
    attributes:
      label: UI / UX Testing
      options:
        - Layout and elements align properly
        - Responsive design works on desktop and mobile
        - Font sizes, colors, and branding are consistent
        - No visual overlap or broken UI

  - type: checkboxes
    id: performance
    attributes:
      label: Performance
      options:
        - Page load times are reasonable
        - No console errors or warnings
        - No lag or freezing during interactions

  - type: checkboxes
    id: security
    attributes:
      label: Security
      options:
        - Inputs validated against injections (XSS, SQL)
        - Proper session and auth handling
        - Sensitive data not exposed

  - type: checkboxes
    id: regression
    attributes:
      label: Regression
      options:
        - Core existing functionality unaffected
        - All critical bugs from previous cycles re-verified

  - type: textarea
    id: notes
    attributes:
      label: Notes or Observations
      description: Add any issues found or special remarks.

  - type: dropdown
    id: result
    attributes:
      label: Test Result
      options:
        - Passed
        - Failed
        - Blocked
