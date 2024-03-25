# ESLint Configurations

This package provides custom `eslint` configurations for your javascript and typescript projects.

## Usage

1. Install the downloaded package.

   ```sh
   $ npm install --save-dev @shvmerc/eslint-config
   ```

2. Install the configuration dependencies.

   `@shvmerc/eslint-config/standard`

   ```sh
   $ npm install --save-dev eslint@8.57.0 eslint-plugin-import@2.29.1 eslint-plugin-n@16.6.2 eslint-plugin-promise@6.1.1 @stylistic/eslint-plugin@1.7.0
   ```

   `@shvmerc/eslint-config/standard-typescript`

   ```sh
   $ npm install --save-dev eslint@8.57.0 eslint-plugin-import@2.29.1 eslint-plugin-n@16.6.2 eslint-plugin-promise@6.1.1 @stylistic/eslint-plugin@1.7.0 @typescript-eslint/eslint-plugin@7.2.0
   ```

3. Extend your local configuration.

   **Example:** `.eslintrc.json`

   ```jsonc
   {
     "extends": "@shvmerc/eslint-config/standard"
   }
   ```

   You can modify the configuration and rules according to your own preferences, for mor information check the official documentation:

   - **Eslint**: https://eslint.org/docs/latest/rules/
   - **Typescript Eslint**: https://typescript-eslint.io/rules/
   - **Stylistic**: https://eslint.style/packages/default
