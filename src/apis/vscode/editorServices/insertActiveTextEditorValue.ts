import { window } from 'vscode';

export async function insertActiveTextEditorValue(value: string) {
  const editor = window.activeTextEditor;
  await editor?.edit((editBuilder) => {
    const activePos = editor.selection.active;
    editBuilder.insert(activePos, value);
  });
}
