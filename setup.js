#!/usr/bin/env node

import { execSync } from "child_process";
import { mkdirSync } from "fs";

// Get folder name from command-line arguments
const folderName = process.argv[2] || "my-blank-project";

console.log(`🚀 Creating a new blank project in "${folderName}"...`);

// Create the directory
mkdirSync(folderName, { recursive: true });

console.log(`✅ Project created successfully in "${folderName}"!`);
