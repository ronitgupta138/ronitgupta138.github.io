# Interactive In-Browser Terminal REPL State Machine Specification

## 1. Architectural Scope
The portfolio features an embedded interactive terminal component simulating a native Linux shell environment directly in the browser:
- **Zero External Dependencies:** Built with pure vanilla JavaScript (ES2022) without heavyweight terminal emulators (e.g. xterm.js).
- **History Navigation:** Implements bidirectional cursor history traversal (Up/Down arrow keys) with a circular 100-command ring buffer.

## 2. Command Dispatch Pipeline
- Registered builtins: `help`, `cat`, `ls`, `whoami`, `projects`, `skills`, `clear`, `contact`.
- ANSI Color Parsing: Custom regex engine translating standard 16-color ANSI escape codes (`\x1b[38;5;...m`) into semantic CSS classes.
