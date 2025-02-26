import { window } from 'vscode'
import { ICommand } from '@app/commands'
import { ConversationStorageService } from '@app/services'

export default class DeleteAllConversationsCommand implements ICommand {
  public readonly id = '_vscode-openai.conversations.delete-all'

  public async execute() {
    window
      .showInformationMessage(
        'Are you sure you want to delete ALL conversation?',
        'Yes',
        'No'
      )
      .then((answer) => {
        if (answer === 'Yes') {
          ConversationStorageService.instance.deleteAll()
        }
      })
  }
}
