# Rule Engine AST Application

A web-based rule engine application that allows users to create, manage, and evaluate eligibility rules based on attributes like age, department, and income using an Abstract Syntax Tree (AST). The app features dark mode support and a responsive interface.

## Features

- **Dark Mode Support**: Toggle between light and dark themes.
- **Rule Creation**: Easily define eligibility rules.
- **Rule List Management**: View and manage created rules.
- **User Data Evaluation**: Input user data to evaluate eligibility against defined rules.
- **Modular Design**: Components such as `RuleForm`, `RuleList`, and `UserDataForm` modularize the code for easy maintenance.

## Technologies Used

- **React**: For building the user interface.
- **Lucide React Icons**: For the dark mode toggle icons.
- **Tailwind CSS**: For styling and theming.
- **Custom Store (useRuleStore)**: Manages state for the rule engine, including dark mode preferences.

## Components

- **App.js**: Main app component managing layout, theming, and component rendering.
- **RuleForm**: Handles rule creation.
- **RuleList**: Displays a list of created rules.
- **UserDataForm**: Allows user data input for eligibility evaluation.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankit6868/Assignt1-ruleengine.git
   cd Assignt1-ruleengine
