#!/usr/bin/env bash
# Repository hygiene check (M1). Runs on every push.
# This is a helper so you can see problems yourself without waiting for grading.
set -uo pipefail
fail=0
err() { echo "FAIL: $1"; fail=1; }
ok()  { echo "  ok: $1"; }

# --- README placeholders ---
if grep -q '<roll>\|<name>\|<username>\|<Project Name>\|<Two or three sentences' README.md 2>/dev/null; then
  err "README.md still has unfilled <placeholders>"
else
  ok "README.md placeholders filled"
fi

# --- README must list roll no, name and GitHub username ---
rows=$(grep -cE '^\|[^|]+\|[^|]+\|[^|]+\|' README.md 2>/dev/null || echo 0)
if [ "$rows" -lt 3 ]; then
  err "README.md author table needs a header, separator and your details row"
else
  ok "author table present"
fi

# --- .gitignore ---
[ -f .gitignore ] && ok ".gitignore present" || err ".gitignore missing"

# --- nothing heavy committed ---
big=$(git ls-files -z | xargs -0 -I{} du -k "{}" 2>/dev/null | awk '$1>5120{print $2}')
if [ -n "$big" ]; then err "files larger than 5 MB are tracked:"; echo "$big"; else ok "no oversized files"; fi

# --- dependency and secret directories must not be tracked ---
bad=$(git ls-files | grep -E '^(node_modules|venv|\.venv|target|dist|build)/|(^|/)\.env$' || true)
if [ -n "$bad" ]; then err "these should not be in git:"; echo "$bad" | head -20; else ok "no dependency or env files tracked"; fi

# --- commit messages ---
lazy=$(git log --pretty=%s -n 50 | grep -icE '^(update|final|commit|asdf|test|fix|changes|done|new)$' || true)
if [ "$lazy" -gt 3 ]; then
  err "$lazy of the last 50 commit messages are not descriptive"
else
  ok "commit messages look reasonable"
fi

echo
[ "$fail" -eq 0 ] && echo "Hygiene check passed." || echo "Hygiene check failed. Fix the items above."
exit $fail
