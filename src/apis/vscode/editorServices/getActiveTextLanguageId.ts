import { window } from 'vscode';

export function getActiveTextLanguageId(): string {
  const languageId = window.activeTextEditor?.document.languageId;
  return languageId ?? '';
}
