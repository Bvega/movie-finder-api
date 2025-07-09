#!/usr/bin/env bash
# bootstrap helper

echo "Installing packages…"
npm install

[[ -f .env ]] || { echo "Creating .env…"; cp .env.example .env; }

echo "Opening VS Code…"
code .
