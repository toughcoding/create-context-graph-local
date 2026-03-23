# Changelog

## v0.4.0 — Hardening, Security & DX

### Bug Fixes
- **Critical:** Enum identifier sanitization — special characters (`A+`, `A-`, `3d_model`) in domain ontology enum values now generate valid Python identifiers with value aliases
- **Critical:** Graceful degradation when Neo4j is unavailable — backend starts in degraded mode, `/health` endpoint reports connectivity status
- **High:** Cypher injection prevention in GDS client — label parameters validated against entity type whitelist
- **High:** CrewAI async/sync deadlock resolved — replaced bare `asyncio.run()` with `nest_asyncio`-compatible helper, crew execution moved to thread
- **High:** Claude Agent SDK model version now configurable via `ANTHROPIC_MODEL` environment variable
- **Medium:** Silent exception swallowing replaced with structured warning messages in `ingest.py` and `vector_client.py`
- **Medium:** JSON parsing errors in agent tool calls now return helpful error messages instead of crashing
- **Medium:** Input validation (`max_length`) added to chat and search request models
- **Low:** CLI validates empty project names before entering wizard
- **Low:** Healthcare YAML blood type enums properly quoted

### New Features
- `--dry-run` CLI flag — preview what would be generated without creating files
- `--verbose` CLI flag — enable debug logging during generation
- `/health` endpoint in generated projects — returns Neo4j connectivity status and app version
- CORS origins configurable via `CORS_ORIGINS` environment variable
- `constants.py` module in generated projects — centralizes magic strings (index names, graph projections, embedding dimensions)
- Document browser pagination (page size 20, prev/next controls)
- Semantic HTML landmarks (`<main>`, `<section>`, `<aside>`) and ARIA labels in frontend
- Actionable error messages in chat interface — distinguishes backend errors, network failures, and Neo4j unavailability

### Security
- Query timeouts (30s default) on all Neo4j operations
- Credential warnings in generated `.env.example`
- CORS production configuration guidance

### Testing
- 365 passing tests (51 new), up from 314
- New: enum identifier sanitization edge cases
- New: models.py compilation across all 22 domains (prevents enum regression)
- New: v0.4.0 feature validation (health endpoint, constants, graceful degradation, input validation, CORS, pagination)
- New: CLI validation and flag tests

## v0.3.0 — Memory Integration, Multi-Turn & DX

- neo4j-agent-memory integration for multi-turn conversations
- Interactive NVL graph visualization (schema view, double-click expand, drag/zoom, property panel)
- LLM-generated demo data (80-90 entities, 25+ documents, 3-5 decision traces per domain)
- Markdown rendering in chat with tool call visualization
- Document browser and entity detail panel
- 7 SaaS connectors
- Custom domain generation
- Neo4j Aura .env import + neo4j-local support
- Docusaurus documentation site
- 314 passing tests
