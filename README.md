# DSS React Template

A customized react boilerplate inspired from CRA structure, but using React v16.11.0.

## Features

- [x] Bundle Analyzer
- [x] Husky & Lint-Staged
- [x] Code-splitting
- [x] PWA ready
- [x] Import aliases
- [x] ESLint & Prettier

## Scripts

| `yarn <script>` | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `start`         | To start develop the app client, integrated with hot reload.    |
| `build`         | To build and minify the app. App will use `prod` API.           |
| `analyze`       | To analyze the app bundle sizes. Will open in `127.0.0.1:8888`. |
| `test`          | To test the app (if unit test is properly setup).               |
| `codegen:lang`  | Generate lang setup to the app (context, hooks, hoc).           |
| `minify:svg`    | Minify svg in enclosed specified path                           |

---

## Notes


### User Management
Import CSV format

{employeeIDCode};{name};{payorID};{jobID};{departmentID};{email};{countryCode};{phoneNumber};{birthday};{gender}

add/remove anything which necessarry.