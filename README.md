# BankOS AI — Enterprise Multi-Agent Banking Orchestration & Compliance System

BankOS AI is a state-of-the-art, enterprise-grade multi-agent orchestrator tailored for high-stakes banking workflows, wealth management compliance, automated credit underwriting, and real-time transaction monitoring. Built for the **IDBI Innovate 2026 Sandbox Track**, the system models complex multi-agent reasoning, auto-underwriting compliance, document analysis, and executive risk auditing with a responsive and polished dark/light themed interface.

---

## 🔒 Security & Safe Repository Pushing (GitHub-Ready)

**Yes, you can safely push this entire repository to GitHub!**

The codebase has been designed with strict adherence to professional full-stack security practices:
1. **No Visible or Hardcoded API Keys**: All AI capabilities utilize the server-side `@google/genai` TypeScript SDK. The Gemini API key is loaded securely at runtime on the server via `process.env.GEMINI_API_KEY`.
2. **Secure Proxying**: The React frontend **never** accesses any API keys directly in the browser. Instead, all client queries are safely proxied through backend `/api/*` endpoints.
3. **Smart Cooldown & Safe Simulation Engine**: If your `GEMINI_API_KEY` is not present, or if you run into Gemini API free-tier rate limits (e.g., `429 Resource Exhausted`), BankOS AI automatically switches to a high-fidelity local Simulation Engine (`SIM ENGINE ACTIVE` indicator). This guarantees uninterrupted system operations and ensures safe sandbox demonstrations without breaking.
4. **Clean Git Rules**: Highly-sensitive workspace artifacts and local secrets are excluded from being committed via the configured `.gitignore` file.

---

## 🛠️ Key Architectural Features

* **Multi-Agent Orchestration**: Coordinate complex banking tasks among 4 specialized AI agents:
  * **Lending Agent (`lending`)**: Underwriting risk, DSRA analysis, and financial ratios.
  * **Legal Document Agent (`docs`)**: Parsing corporate registries, certificates of incumbency, and cross-border BVI entity compliance.
  * **Fraud & Compliance Agent (`compliance`)**: KYC checks, suspicious transactions, and Enhanced Due Diligence (EDD).
  * **Wealth Management Agent (`wealth`)**: Portfolio optimization, high-net-worth individual (HNWI) asset flows, and AUM transitions.
* **Interactive AI Chat Hub**: Prompt specific agents and watch them produce detailed Markdown answers parsed dynamically. Includes a fallback warning system if rate-limits trigger a simulation backup.
* **Real-Time Indian Standard Time (IST)**: Custom configured clock running in local IST format (`YYYY-MM-DD HH:MM:SS IST`).
* **Interactive Document Viewer**: Analyze uploaded legal and financial files, execute simulated OCR/compliance checks, and coordinate multi-agent audits.
* **Executive Analytics Panel**: Deep insights with rich, interactive charts tracking agent decision distributions, loan default risks, and systemic trust scores.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm (v9 or higher)

### Installation

1. Clone or download the ZIP of this repository.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Set up your local environment file:
   ```bash
   cp .env.example .env
   ```
4. Define your `GEMINI_API_KEY` inside `.env` to activate full server-side Gemini intelligence:
   ```env
   GEMINI_API_KEY="AIzaSyYourActualKeyHere..."
   ```

### Running the Application (Development Mode)

Start the unified development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Builds

To compile and bundle both the React frontend assets and the Express backend server into an optimized, self-contained, production-ready environment:

```bash
npm run build
npm start
```

*The bundle compiles the server using `esbuild` directly into `dist/server.cjs`, resolving all ES Module paths cleanly for high-performance containerized workloads on platforms like Cloud Run.*
