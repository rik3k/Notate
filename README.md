# Notate

Notate is a powerful desktop research assistant that combines AI-driven analysis with advanced vector search technology. It streamlines your research workflow by intelligently processing, organizing, and retrieving information from documents, audio, and text across multiple formats. With support for various LLM providers and local models, Notate offers flexible AI capabilities while maintaining data privacy. Built for researchers, academics, and knowledge workers, it features real-time collaboration, accessible UI, and cross-platform compatibility.

## Community

Join our Discord community to get help, share feedback, and connect with other users and developers:
[Discord Server](https://discord.gg/vEFAwB8wFC)


## Project Structure

- `Backend/`: FastAPI-based server application
  - `src/`
    - `authentication/`: Auth system and middleware
    - `data/`: Data retrieval, fetching, database operations
    - `endpoint/`: API schemas and route models
    - `vectorstorage/`: Vector database operations
    - `voice/`: Audio processing and transcription
- `Frontend/`: Electron + React-based desktop application
  - `src/`
    - `app/`: Main UI components and styles
    - `assets/`: Images, icons, and static resources
    - `components/`: Core UI components and layouts
    - `context/`: Global state management and providers
    - `electron/`: Main and renderer process code
    - `hooks/`: Custom React hooks for shared logic
    - `lib/`: Core functionality and shared libraries
    - `utils/`: Helper functions and utilities
- `Database/`: Development SQLite Database
- `FileCollections/`: Development User File Collections

## Prerequisites

### Local Only Mode Requirements

- Ollama Installed
- Python 3.10
- Node.js v16 or higher
- Package manager: npm or pnpm
- At least 2GB of free disk space (Recommended 10GB+ minimum for local models and FileCollections)
- Minimum 8GB RAM recommended
- CPU: 4 cores or more
- GPU recommended for local model inference 10GB VRAM or more preferably
- Operating System:
  - macOS 10.15 or later (Intel/Apple Silicon)
  - Windows 10/11
  - Linux (Ubuntu 20.04 or later)

### External Requirements

- Python 3.10
- Node.js v16 or higher
- Package manager: npm or pnpm
- CPU: 4 cores or more
- MEMORY: 8GB RAM or more
- DISK: 2GB free space (Recommended 4GB minimum for FileCollections)
- OpenAI API key (optional)
  - Required for OpenAI embeddings and GPT models
  - Configure in settings after installation
- Anthropic API key (optional)
  - Required for Claude models
  - Configure in settings after installation
- Google API key (optional)
  - Required for Google models
  - Configure in settings after installation
- XAI API key (optional)
  - Required for XAI models
  - Configure in settings after installation

## Installation

1. Clone the repository: `git clone https://github.com/CNTRLAI/Notate.git`
2. Navigate to the electron project directory: `cd notate/Frontend`
3. Install dependencies: `npm install` or `pnpm install`
4. Build the frontend: `npm run build` or `pnpm run build`

## Running the Application in Development Mode

- Dev mode (macOS): `npm run dev:mac` or `pnpm run dev:mac`
- Dev mode (Windows): `npm run dev:win` or `pnpm run dev:win`
- Dev mode (Linux): `npm run dev:linux` or `pnpm run dev:linux`

## Compiling to .exe, .dmg, and .AppImage

- Production mode (macOS): `npm run dist:mac` or `pnpm run dist:mac`
- Production mode (Windows): `npm run dist:win` or `pnpm run dist:win`
- Production mode (Linux): `npm run dist:linux` or `pnpm run dist:linux`

## Location of the Application

(if Apple Silicon)

- macOS: `Notate/Frontend/dist/mac-arm64/Notate.app`
- macOS Installer: `Notate/Frontend/dist/Notate.dmg`

(if Intel)

- macOS: `Notate/Frontend/dist/mac/Notate.app`
- macOS Installer: `Notate/Frontend/dist/Notate.dmg`

(if Windows)

- Executable: `Notate/Frontend/dist/Notate.exe`
- Installer: `Notate/Frontend/dist/Notate.msi`

(if Linux)

- AppImage: `Notate/Frontend/dist/Notate.AppImage`
- Debian Package: `Notate/Frontend/dist/Notate.deb`

## Coming Soon

- [ ] Chrome Extension For Ingesting Webpages/Files
- [ ] Advanced Ingestion Settings
- [ ] Advanced Agent Actions
- [ ] Additional Document Types
- [ ] Output to Speech
- [ ] built-in llama.cpp support