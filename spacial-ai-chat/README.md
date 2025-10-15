## Spacial AI Chat

A small React + Vite TypeScript demo that connects to an LLM backend (this workspace contains an example integration with AWS Bedrock). It provides a simple chat UI with answer cards, hit/source display, and controls.

### Tech stack
- React 19
- Vite
- TypeScript

### Quick start
These commands assume you have Node.js installed (16+ recommended) and are using zsh on macOS.

Install dependencies:

```bash
npm install
# or: pnpm install
```

Run the dev server:

```bash
npm run dev
# open http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

### Project structure (important files)

- `index.html` — Vite entry
- `src/main.tsx` — React entrypoint
- `src/App.tsx` — top-level app
- `src/components/` — UI components (AnswerCard, Controls, HitsCard, Score, SourcesCard)
- `tsconfig.json` — TypeScript config
- `package.json` — scripts and dependencies

### AWS Bedrock / LLM integration notes

This project contains an example connection to an LLM backend. To run the app with a real Bedrock (or other) backend you will typically need to provide credentials and an endpoint in one of the following ways:

- Environment variables (recommended for local development):

```bash
export BEDROCK_ENDPOINT="https://your-bedrock-endpoint"
# If using AWS SDK, ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
```

- Alternatively, use the AWS CLI credentials (`~/.aws/credentials`) or a credentials provider supported by the AWS SDK.

Check the source code (search for `Bedrock`, `bedrock`, `aws`, or `fetch`) to find where the app reads the endpoint and credentials and adapt accordingly.

Security: never commit secrets to the repository. Use environment variables, a secrets manager, or local `.env` files excluded from version control.

### Troubleshooting
- Port in use: Vite defaults to port 5173. If it's already in use, either stop the process or run `npm run dev -- --port 5174`.
- Type errors: run `npm run build` or `tsc` to see TypeScript diagnostics.

### Development tips and next steps
- Add a `.env.example` describing required environment variables for others.
- Add unit tests for core components and a simple integration test for the backend call.
- If this will be used in production, add proper error handling and rate-limiting around backend calls.

