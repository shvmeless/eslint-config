# ESLint Configurations

This package provides custom `eslint` configurations for your javascript and typescript projects.

## Usage

**1.** Install this package.

```bash
npm install --save-dev @shvmerc/eslint-config
```

**2.** Install the required dependencies of one of the following configurations:

- [**`standard`**](#standard) for javascript projects.
- [**`standard-ts`**](#standard-with-typescript) for javascript projects with typescript support.
- [**`standard-jsx`**](#standard-with-jsx) for javascript projects with jsx support.
- [**`standard-tsx`**](#standard-with-typescript-and-jsx) for javascript projects with typescript and jsx support.

**3.** Extend the target configuration in your `.eslintrc.json` file.

**Example:**

```json
{
  "extends": "@shvmerc/eslint-config/standard"
}
```

## Configurations

### Standard

`@shvmerc/eslint-config/standard`

Minimum required versions of the dependencies:

```json
{
  "eslint": "8.57.0",
  "eslint-plugin-import": "2.29.1",
  "eslint-plugin-n": "16.6.2",
  "eslint-plugin-promise": "6.1.1",
  "@stylistic/eslint-plugin": "1.7.0"
}
```

Install the exact versions of the dependencies:

```bash
npm install --save-dev eslint eslint-plugin-import eslint-plugin-n eslint-plugin-promise @stylistic/eslint-plugin
```

Install the latest and safest minor versions of the dependencies:

```bash
npm install --save-dev eslint@^8.57.0 eslint-plugin-import@^2.29.1 eslint-plugin-n@^16.6.2 eslint-plugin-promise@^6.1.1 @stylistic/eslint-plugin@^1.7.0
```

Install the latest and safest versions of the dependencies:

```bash
npm install --save-dev eslint@">=8.57.0" eslint-plugin-import@">=2.29.1" eslint-plugin-n@">=16.6.2" eslint-plugin-promise@">=6.1.1" @stylistic/eslint-plugin@">=1.7.0"
```

### Standard with TypeScript

`@shvmerc/eslint-config/standard-ts`

Minimum required versions of the dependencies:

```json
{
  "eslint": "8.57.0",
  "eslint-plugin-import": "2.29.1",
  "eslint-plugin-n": "16.6.2",
  "eslint-plugin-promise": "6.1.1",
  "@stylistic/eslint-plugin": "1.7.0",
  "@typescript-eslint/eslint-plugin": "7.2.0"
}
```

Install the exact versions of the dependencies:

```bash
npm install --save-dev eslint eslint-plugin-import eslint-plugin-n eslint-plugin-promise @stylistic/eslint-plugin @typescript-eslint/eslint-plugin
```

Install the latest and safest minor versions of the dependencies:

```bash
npm install --save-dev eslint@^8.57.0 eslint-plugin-import@^2.29.1 eslint-plugin-n@^16.6.2 eslint-plugin-promise@^6.1.1 @stylistic/eslint-plugin@^1.7.0 @typescript-eslint/eslint-plugin@^7.2.0
```

Install the latest and safest versions of the dependencies:

```bash
npm install --save-dev eslint@">=8.57.0" eslint-plugin-import@">=2.29.1" eslint-plugin-n@">=16.6.2" eslint-plugin-promise@">=6.1.1" @stylistic/eslint-plugin@">=1.7.0" @typescript-eslint/eslint-plugin@">=7.2.0"
```

### Standard with JSX

`@shvmerc/eslint-config/standard-jsx`

Minimum required versions of the dependencies:

```json
{
  "eslint": "8.57.0",
  "eslint-plugin-import": "2.29.1",
  "eslint-plugin-n": "16.6.2",
  "eslint-plugin-promise": "6.1.1",
  "@stylistic/eslint-plugin": "1.7.0",
  "eslint-plugin-react": "7.34.1"
}
```

Install the exact versions of the dependencies:

```bash
npm install --save-dev eslint eslint-plugin-import eslint-plugin-n eslint-plugin-promise @stylistic/eslint-plugin eslint-plugin-react
```

Install the latest and safest minor versions of the dependencies:

```bash
npm install --save-dev eslint@^8.57.0 eslint-plugin-import@^2.29.1 eslint-plugin-n@^16.6.2 eslint-plugin-promise@^6.1.1 @stylistic/eslint-plugin@^1.7.0 eslint-plugin-react@^7.34.1
```

Install the latest and safest versions of the dependencies:

```bash
npm install --save-dev eslint@">=8.57.0" eslint-plugin-import@">=2.29.1" eslint-plugin-n@">=16.6.2" eslint-plugin-promise@">=6.1.1" @stylistic/eslint-plugin@">=1.7.0" eslint-plugin-react@">=7.34.1"
```

### Standard with TypeScript and JSX

`@shvmerc/eslint-config/standard-tsx`

Minimum required versions of the dependencies:

```json
{
  "eslint": "8.57.0",
  "eslint-plugin-import": "2.29.1",
  "eslint-plugin-n": "16.6.2",
  "eslint-plugin-promise": "6.1.1",
  "@stylistic/eslint-plugin": "1.7.0",
  "eslint-plugin-react": "7.34.1",
  "@typescript-eslint/eslint-plugin": "7.2.0"
}
```

Install the exact versions of the dependencies:

```bash
npm install --save-dev eslint eslint-plugin-import eslint-plugin-n eslint-plugin-promise @stylistic/eslint-plugin eslint-plugin-react @typescript-eslint/eslint-plugin
```

Install the latest and safest minor versions of the dependencies:

```bash
npm install --save-dev eslint@^8.57.0 eslint-plugin-import@^2.29.1 eslint-plugin-n@^16.6.2 eslint-plugin-promise@^6.1.1 @stylistic/eslint-plugin@^1.7.0 eslint-plugin-react@^7.34.1 @typescript-eslint/eslint-plugin@^7.2.0
```

Install the latest and safest versions of the dependencies:

```bash
npm install --save-dev eslint@">=8.57.0" eslint-plugin-import@">=2.29.1" eslint-plugin-n@">=16.6.2" eslint-plugin-promise@">=6.1.1" @stylistic/eslint-plugin@">=1.7.0" eslint-plugin-react@">=7.34.1" @typescript-eslint/eslint-plugin@">=7.2.0"
```

## Customization

You can modify the configuration and rules according to your own preferences, for mor information check the official documentation:

- **Eslint**: https://eslint.org/docs/latest/rules/
- **Stylistic**: https://eslint.style/packages/default
- **Typescript**: https://typescript-eslint.io/rules/
- **React**: https://github.com/jsx-eslint/eslint-plugin-react
