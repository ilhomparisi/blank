#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import readline from "readline";

// Setup CLI prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt for project name if not provided
function askForProjectName() {
  return new Promise((resolve) => {
    rl.question("Enter project name: ", (name) => {
      rl.close();
      process.stdin.destroy();
      resolve(name.trim() || "sample-project");
    });
  });
}

(async () => {
    // Get project name from CLI args or ask user
    const folderName = process.argv[2] || (await askForProjectName());
  
    // If project name was provided via CLI args, ensure stdin is closed
    if (process.argv[2]) {
      process.stdin.destroy();
    }
  
    // Target project directory
    const targetPath = join(process.cwd(), folderName);
  
    // Ensure the directory doesn't already exist
    if (existsSync(targetPath)) {
      console.error(`❌ Error: The folder "${folderName}" already exists.`);
      process.exit(1);
    }
  
    // Create the project directory
    mkdirSync(targetPath, { recursive: true });
  
    // Generate package.json content
    const packageJson = {
      name: folderName,
      version: "1.0.0",
      description: "",
      main: "index.js",
      scripts: {
        start: "node index.js",
      },
      keywords: [],
      author: "",
      license: "ISC",
      type: "commonjs",
    };
  
    // Write package.json
    writeFileSync(join(targetPath, "package.json"), JSON.stringify(packageJson, null, 2));
  
    // Write index.js with "hello world"
    writeFileSync(join(targetPath, "index.js"), `console.log("hello world");\n`);
  
    console.log(`✅ Project "${folderName}" created successfully!`);
    console.log("📂 Now run:");
    console.log(`   cd ${folderName}`);
  })();
