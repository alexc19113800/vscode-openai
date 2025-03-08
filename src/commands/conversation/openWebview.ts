import { ICommand } from '@app/commands';
import { IConversation } from '@app/interfaces';
import { ConversationStorageService } from '@app/services';

export default class OpenConversationWebviewCommand implements ICommand {
  public readonly id = '_vscode-openai.conversation.open.webview';

  public execute(args: { data: IConversation }) {
    ConversationStorageService.instance.show(args.data.conversationId);
  }
}
