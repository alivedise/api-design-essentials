# API Design Essentials (ADE) Documentation

This repository contains the documentation for API Design Essentials (ADE), a comprehensive guide for designing and implementing APIs. It also deploys a Redocly ruleset as `api-design-essentials/recommended`.

## Overview

The ADE documentation, built using VitePress, provides guidelines, best practices, and standards for API design across various categories. It aims to ensure consistency and quality in API development.

## Key Features

- Comprehensive API design principles
- Multilingual support (English and Traditional Chinese)
- Semantic versioning
- OpenAPI examples
- Developer experience focus

## Structure

The documentation is organized into several categories, including:

- ADE Overview
- Engineering Principles
- HTTP Basics
- REST Basics
- HTTP Semantics
- OpenAPI Design
- Error Design
- Event Design
- API Governance

## Redocly Ruleset Usage

### Installation

Install dependencies:

```sh
npm install -g @redocly/cli
npm add -D @redocly/openapi-core
npm add -D api-design-essentials
```

### Configuration

Add `.redocly.yaml` to your API repo:

```yaml
apiDefinitions:
  main: openapi.yaml
extends:
  - 'recommended'
  - 'api-design-essentials/recommended'
plugins:
  - ./node_modules/api-design-essentials/dist/plugin.cjs
```

### Usage

Run with Redocly:

```sh
redocly lint
```

### New Redocly Rules

The package includes several custom rules to enforce best practices:

- api-design-essentials/always-return-json-object: Ensures top-level JSON responses are objects.
- api-design-essentials/format-enumeration-upper-snake-case: Enforces upper snake case for enum values.
- api-design-essentials/no-request-body-in-get-method: Prohibits request bodies in GET methods.
- api-design-essentials/not-use-null-for-empty-array: Discourages null for empty arrays.
- api-design-essentials/no-basic-auth-in-security-schemes: Prevents basic authentication in security schemes.
- api-design-essentials/use-absolute-profile-url: Enforces absolute URLs for profiles.
- api-design-essentials/use-camel-case-for-property-name: Encourages camel case for property names.
- api-design-essentials/use-camel-case-for-query-parameter: Enforces camel case for query parameters.
- api-design-essentials/use-common-date-and-time-format: Ensures common date and time formats.
- api-design-essentials/use-extensible-enum: Promotes extensible enums.
- api-design-essentials/use-kebab-case-for-path-parameter: Enforces kebab case for path parameters.
- api-design-essentials/use-oas-3: Requires OpenAPI Specification 3.0.0 or higher.
- api-design-essentials/use-string-enum: Ensures enums are represented as strings.
- api-design-essentials/use-tls: Enforces TLS for server URLs.
- api-design-essentials/check-x-audience: Validates the x-audience extension.
- api-design-essentials/error4xx-rfc9457: Ensures 4xx error responses comply with RFC 9457.
- api-design-essentials/error5xx-rfc9457: Ensures 5xx error responses comply with RFC 9457.

## Contributing

Contributions and feedback are welcome via the [GitHub repository](https://github.com/alivedise/api-design-essentials).
