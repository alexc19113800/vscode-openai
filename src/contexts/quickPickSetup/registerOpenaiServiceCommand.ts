import { commands, ExtensionContext } from 'vscode'
import { VSCODE_OPENAI_REGISTER } from '@app/constants'
import { OpenaiQuickPickCommand } from './openaiQuickPickCommand'
import { createErrorNotification } from '@app/utilities/node'

export function registerOpenaiServiceCommand(context: ExtensionContext) {
  try {
    const openAiCmd = OpenaiQuickPickCommand.getInstance(context)

    context.subscriptions.push(
      commands.registerCommand(VSCODE_OPENAI_REGISTER.SERVICE_COMMAND_ID, () =>
        openAiCmd.execute()
      )
    )
  } catch (error) {
    createErrorNotification(error)
  }
}
