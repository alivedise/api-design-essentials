---
title: API lint
---

# Using Redocly as an API Linter

## Step 1: Installation

First, install Redocly CLI and the custom rule set:

```bash
npm install -g @redocly/cli
npm install -D @redocly/openapi-core
npm install -D api-design-essentials
```

## Step 2: Initialize Redocly in your project

Navigate to your project directory and create a `.redocly.yaml` configuration file in your project root.

## Step 3: Configure Redocly

Open the `.redocly.yaml` file and customize it to include the custom rule set. Here's an example configuration:

```yaml
apiDefinitions:
  main: openapi.yaml
extends:
  - 'recommended'
  - 'api-design-essentials/recommended'
plugins:
  - ./node_modules/api-design-essentials/dist/plugin.cjs
```

## Step 4: Run the linter

To lint your API specification, run:

```bash
redocly lint openapi.yaml
```

Replace `openapi.yaml` with the path to your OpenAPI specification file.

## Step 5: Interpret the results

Redocly will output any warnings or errors it finds, including those from the custom rule set.

## Step 6: Fix issues and re-run

Address the issues reported by the linter in your OpenAPI specification file. After making changes, re-run the linter to ensure all issues are resolved.

## Step 7: Integrate with CI/CD

To ensure consistent API documentation quality, integrate Redocly linting into your CI/CD pipeline. For example, in a GitHub Actions workflow:

```yaml
name: API Linting

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
    - run: npm install -g @redocly/cli
    - run: redocly lint openapi.yaml
```

This workflow will run the Redocly linter with the custom rule set on every push and pull request.
