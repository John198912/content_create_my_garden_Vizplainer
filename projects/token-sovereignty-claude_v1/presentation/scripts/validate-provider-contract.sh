#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROVIDERS="$ROOT/tts-providers"
failed=0
checked=0

for provider in "$PROVIDERS"/*.sh; do
  [[ -f "$provider" ]] || continue
  checked=$((checked + 1))
  name="$(basename "$provider")"
  if bash -c '
    set -euo pipefail
    source "$1"
    declare -F tts_synthesize >/dev/null
    if declare -F tts_check >/dev/null; then :; fi
    if declare -F tts_install_help >/dev/null; then :; fi
  ' _ "$provider"; then
    echo "✓ $name"
  else
    echo "✗ $name does not implement tts_synthesize [tts_check] [tts_install_help]" >&2
    failed=$((failed + 1))
  fi
done

echo "checked $checked provider(s)"
[[ "$failed" -eq 0 ]]
