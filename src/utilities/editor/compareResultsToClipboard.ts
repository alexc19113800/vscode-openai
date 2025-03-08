import { commands, env, window } from 'vscode';
import { ConversationStorageService } from '@app/services';
import { IChatCompletion, IConversation, IPersonaOpenAI } from '@app/interfaces';
import { createChatCompletionMessage } from '@app/apis/openai';
import {
  ChatCompletionConfig,
  ChatCompletionModelType,
} from '@app/services/configuration';

export const compareResultsToClipboard = async (
  persona: IPersonaOpenAI | undefined,
  prompt: string | undefined
): Promise<void> => {
  if (!persona || !prompt) {
    window.showErrorMessage('Persona or prompt is undefined.');
    return;
  }

  const editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage('No active text editor available.');
    return;
  }

  const documentUri = editor.document.uri;
  const conversation: IConversation =
    await ConversationStorageService.instance.create(persona);

  const chatCompletion: IChatCompletion = {
    content: prompt,
    author: 'vscode-openai-editor',
    timestamp: new Date().toLocaleString(),
    mine: false,
    completionTokens: 0,
    promptTokens: 0,
    totalTokens: 0,
  };

  const cfg = ChatCompletionConfig.create(ChatCompletionModelType.INFERENCE);

  // Clearing the welcome message more idiomatically
  conversation.chatMessages.length = 0;
  conversation.chatMessages.push(chatCompletion);

  try {
    let result = '';
    function messageCallback(_type: string, data: IChatCompletion): void {
      if (!conversation) {return;}
      result = data.content;
    }
    await createChatCompletionMessage(conversation, cfg, messageCallback);
    const originalValue = await env.clipboard.readText();

    await env.clipboard.writeText(result ?? '');
    await commands.executeCommand(
      'workbench.files.action.compareWithClipboard',
      documentUri
    );

    await env.clipboard.writeText(originalValue);
  } catch (error) {
    window.showErrorMessage(`An error occurred: ${error}`);
    console.error(error);
  }
};
