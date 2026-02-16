# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Salesforce Commerce Cloud (SFCC) SFRA cartridge that integrates AirRobe's circular wardrobe widgets into SFCC storefronts.

## Tech Stack

- JavaScript, SCSS
- Webpack 4, sgmf-scripts (SFRA build tooling)
- Mocha 5.2, Chai, Sinon (testing)
- ESLint (Airbnb config), StyleLint

## Commands

- **Install:** `npm install`
- **Lint:** `npm run lint` (all) / `npm run lint:js` / `npm run lint:css`
- **Build JS:** `npm run compile:js`
- **Build SCSS:** `npm run compile:scss`
- **Test:** `npm run test`
- **Upload to SFCC:** `npm run upload` / `npm run uploadCartridge`

## Architecture

- `cartridges/int_airrobe_core/` — core AirRobe functionality
- `cartridges/int_airrobe_sfra/` — SFRA-specific customizations
- `test/` — unit tests
- `documentation/` — integration docs
- Compiled assets output to `cartridges/int_airrobe_core/cartridge/static/`

## Conventions

- Version: 23.1.0
- Requires `dw.json` with Business Manager credentials for SFCC deployment
- ESLint with Airbnb base config, StyleLint with standard + SCSS
