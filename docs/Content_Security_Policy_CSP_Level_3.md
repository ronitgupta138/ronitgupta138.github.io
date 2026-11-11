# Content Security Policy (CSP) Level 3 Implementation

## 1. Directives
- default-src 'self'.
- script-src 'self'.
- style-src 'self' 'unsafe-inline'.
- img-src 'self' data: https://hits.sh https://img.shields.io.
- Disallows unsafe eval and frame embedding.
