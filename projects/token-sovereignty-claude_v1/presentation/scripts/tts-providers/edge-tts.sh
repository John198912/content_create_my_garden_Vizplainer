#!/usr/bin/env bash
# edge-tts: free, no API key, but REQUIRES network access to Microsoft TTS.
set -euo pipefail

tts_check() {
  command -v edge-tts >/dev/null 2>&1 || {
    echo "✗ edge-tts not installed" >&2
    return 1
  }
}

tts_install_help() {
  cat <<'EOF' >&2
Install edge-tts:
  pip install edge-tts

It is free and needs no API key, but synthesis requires an internet
connection to Microsoft's speech service. It is not an offline provider.
EOF
}

tts_synthesize() {
  local text="$1"
  local output_mp3="$2"
  local voice="${3:-${EDGE_TTS_VOICE:-zh-CN-XiaoxiaoNeural}}"
  local rate="${EDGE_TTS_RATE:-+0%}"
  local pitch="${EDGE_TTS_PITCH:-+0Hz}"

  edge-tts \
    --voice "$voice" \
    --rate "$rate" \
    --pitch "$pitch" \
    --text "$text" \
    --write-media "$output_mp3" \
    >/dev/null 2>&1

  [[ -s "$output_mp3" ]]
}
