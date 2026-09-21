const vscode = require("vscode");

const FALLBACK_CONTEXT = "chatgpt.doesNotSupportSecondarySidebar";
const FALLBACK_CONTAINER = "workbench.view.extension.codexViewContainer";
const FALLBACK_VIEW = "chatgpt.sidebarView.focus";

let output;

function log(message) {
  output?.appendLine(`[${new Date().toISOString()}] ${message}`);
}

async function enablePrimarySidebar() {
  await vscode.commands.executeCommand(
    "setContext",
    FALLBACK_CONTEXT,
    true
  );
  log(`Set ${FALLBACK_CONTEXT}=true`);
}

async function openCodex() {
  try {
    await enablePrimarySidebar();

    log(`Opening ${FALLBACK_CONTAINER}`);
    await vscode.commands.executeCommand(FALLBACK_CONTAINER);

    log(`Focusing ${FALLBACK_VIEW}`);
    await vscode.commands.executeCommand(FALLBACK_VIEW);
    log("Codex primary-sidebar command completed");
  } catch (error) {
    const message = error instanceof Error ? error.stack || error.message : String(error);
    log(`ERROR: ${message}`);
    output.show(true);
    void vscode.window.showErrorMessage(`Codex Cursor Sidebar failed: ${message}`);
  }
}

async function activate(context) {
  output = vscode.window.createOutputChannel("Codex Primary Sidebar for Cursor");
  context.subscriptions.push(output);
  log(`Activated in ${vscode.env.appName} ${vscode.version}`);

  await enablePrimarySidebar();

  // Cursor and Codex can finish their own startup asynchronously. Reapply the
  // compatibility context after startup settles in case it was overwritten.
  for (const delay of [500, 1500]) {
    const timer = setTimeout(() => {
      void enablePrimarySidebar().catch((error) => {
        log(`Delayed context update failed: ${String(error)}`);
      });
    }, delay);
    context.subscriptions.push({ dispose: () => clearTimeout(timer) });
  }

  context.subscriptions.push(
    vscode.commands.registerCommand("codexCursor.open", openCodex)
  );

}

module.exports = { activate };
