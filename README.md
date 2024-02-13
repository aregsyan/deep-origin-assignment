# deep-origin-assignment

### About the project

Project is JSON Schema Renderer and validator with React and Typescript.

After clarifying the requirements with Amber, the project has backend and frontend parts or implementations.

<b>Backend</b> part is a simple Express application that has following features:

- It saves a JSON schema in memory.
- It validates a JSON object based on a saved JSON schema.
- It sends a response based on validation results.

<b>Frontend</b> part is a simple React application that has following features:

- It adds a new JSON schema which is saved in the backend.
- It renders based on added JSON schema and generates a form based on the schema.
- It validates the form based on the schema and display the validation errors.
- It sends the form data to the backend and displays the response.

### Project structure

Backend is created with Express and Typescript. It uses InversifyJS for dependency injection and Ajv for JSON schema validation.

Frontend is created with React and Typescript. It uses React Json Schema Form for rendering the form and Ajv for JSON schema validation.

### Prerequisites

- Node.js v18+.

### Tools and packages used

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [InversifyJS](https://inversify.io/)
- [Express](https://expressjs.com/)
- [React Json Schema Form](https://rjsf-team.github.io/react-jsonschema-form/docs/)
- [Ajv JSON Schema Validator](https://ajv.js.org/)

### Installation

```bash
npm install
```

### Building the project

```bash
npm run build
```

### Running the project

```bash
npm start
```
