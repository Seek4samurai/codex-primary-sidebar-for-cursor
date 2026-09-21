# Codex Primary Sidebar for Cursor

Keep OpenAI Codex where you expect it: in Cursor's primary sidebar.

This small compatibility extension makes the Codex sidebar available in Cursor and adds the command **Codex: Open Codex in Primary Sidebar** to the Command Palette.

## Requirements

- Cursor or another VS Code-compatible editor based on VS Code 1.90 or newer
- The official **OpenAI Codex** extension (`openai.chatgpt`), installed automatically as a dependency

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on macOS).
2. Run **Codex: Open Codex in Primary Sidebar**.

The compatibility setting is also applied automatically after startup, so Codex remains available in the primary sidebar.

## Troubleshooting

If Codex does not appear, confirm that the OpenAI Codex extension is enabled, then run the command again. Diagnostic details are available in the **Codex Primary Sidebar for Cursor** output channel.

## Privacy

This extension does not collect telemetry or send data anywhere. It only invokes editor commands supplied by Cursor and the OpenAI Codex extension.

## License

MIT
