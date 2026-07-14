#!/usr/bin/env bash
# Volcano Ark (火山方舟) Agent Plan TTS provider — seed-tts-2.0.
#
# Docs:  https://console.volcengine.com/ark/region:cn-beijing/docs/82379/2516286
# Auth:  X-Api-Key header (Agent Plan API key)
# Endpoint: https://openspeech.bytedance.com/api/v3/plan/tts/unidirectional
# Response: Chunked JSON lines — code=0 → base64 audio chunks, code=20000000 → END
#
# Required env:
#   VOLCANO_TTS_KEY     API key from Ark Agent Plan console
#
# Optional env:
#   VOLCANO_TTS_VOICE   voice ID (default: zh_female_mizai_uranus_bigtts)
#   VOLCANO_TTS_SPEED   speech rate (default: 0 = normal)
set -euo pipefail

DEFAULT_ENDPOINT="https://openspeech.bytedance.com/api/v3/plan/tts/unidirectional"
DEFAULT_VOICE="zh_female_mizai_uranus_bigtts"
DEFAULT_SPEED="0"
DEFAULT_KEY="VOLCANO_TTS_KEY_PLACEHOLDER"

tts_check() {
  command -v curl >/dev/null 2>&1 || { echo "✗ curl not found" >&2; return 1; }
  local key="${VOLCANO_TTS_KEY:-$DEFAULT_KEY}"
  [[ -n "$key" ]] || { echo "✗ VOLCANO_TTS_KEY not set" >&2; return 1; }
}

tts_install_help() {
  cat <<'EOF' >&2
Volcano Ark Agent Plan TTS (seed-tts-2.0)

  Get API key: https://console.volcengine.com/ark → Agent Plan → API Key
  Set:         export VOLCANO_TTS_KEY=ark-xxxxx
  Voice:       export VOLCANO_TTS_VOICE=zh_female_mizai_uranus_bigtts

Dependencies: curl
EOF
}

tts_synthesize() {
  local text="$1"
  local out="$2"
  local voice="${3:-${VOLCANO_TTS_VOICE:-$DEFAULT_VOICE}}"
  local key="${VOLCANO_TTS_KEY:-$DEFAULT_KEY}"
  local endpoint="${VOLCANO_TTS_ENDPOINT:-$DEFAULT_ENDPOINT}"
  local speed="${VOLCANO_TTS_SPEED:-$DEFAULT_SPEED}"

  local req_id
  req_id="tts-$(date +%s)-$$-$RANDOM"

  local payload
  payload=$(jq -n \
    --arg text "$text" \
    --arg speaker "$voice" \
    --argjson speed "$speed" \
    '{
      req_params: {
        text: $text,
        speaker: $speaker,
        audio_params: {
          format: "mp3",
          sample_rate: 24000,
          speech_rate: $speed
        }
      }
    }')

  local tmp_audio
  tmp_audio=$(mktemp -t volcano-tts).mp3

  # Chunked JSON response: each line is a JSON object
  # code=0 → base64 audio chunk in .data
  # code=20000000 → end of stream
  local chunk count=0
  while IFS= read -r chunk; do
    [[ -z "$chunk" ]] && continue

    local code
    code=$(echo "$chunk" | jq -r '.code // empty' 2>/dev/null || echo "")

    if [[ "$code" == "0" ]]; then
      local b64
      b64=$(echo "$chunk" | jq -r '.data // empty' 2>/dev/null || echo "")
      if [[ -n "$b64" ]]; then
        echo "$b64" | base64 -d >> "$tmp_audio" 2>/dev/null || true
        count=$((count + 1))
      fi
    elif [[ "$code" == "20000000" ]]; then
      break
    elif [[ -n "$code" && "$code" != "0" ]]; then
      echo "✗ TTS error code=$code: $(echo "$chunk" | jq -c '.' 2>/dev/null)" >&2
      rm -f "$tmp_audio"
      return 1
    fi
  done < <(curl -fsS -N -X POST \
    "$endpoint" \
    -H "X-Api-Key: ${key}" \
    -H "X-Api-Resource-Id: seed-tts-2.0" \
    -H "Content-Type: application/json" \
    -H "Connection: keep-alive" \
    -d "$payload" 2>/dev/null)

  if [[ "$count" -eq 0 || ! -s "$tmp_audio" ]]; then
    echo "✗ no audio data received" >&2
    rm -f "$tmp_audio"
    return 1
  fi

  mv "$tmp_audio" "$out"
  [[ -s "$out" ]]
}
