import {
  getVscodeOpenAccessToken,
  MultiStepInput,
  SecretStorageService,
} from '@app/apis/vscode';
import { SettingConfig as settingCfg } from '@app/services';
import { ExtensionContext } from 'vscode';
import { showQuickPickVscodeAuthentication } from './commands';
import { IQuickPickSetup } from './interface';

export async function quickPickSetupVscodeOpenai(
  _context: ExtensionContext
): Promise<void> {
  async function collectInputs(): Promise<IQuickPickSetup> {
    const state = {} as Partial<IQuickPickSetup>;
    state.serviceProvider = 'VSCode-OpenAI';
    state.title = 'Configure Service Provider (openai.azure.com)';
    state.baseUrl = `https://api.arbs.io/openai/inference/v1`;
    state.step = 0;
    const steps = [
      (input: MultiStepInput) =>
        showQuickPickVscodeAuthentication(input, state),
    ];
    state.totalSteps = steps.length;

    await MultiStepInput.run(async (input) => {
      for (const step of steps) {
        await step(input);
      }
    });

    return state as IQuickPickSetup;
  }

  const state = await collectInputs();
  const accessToken = await getVscodeOpenAccessToken();
  if (!accessToken) {return;}

  await SecretStorageService.instance.setAuthApiKey(accessToken);
  settingCfg.serviceProvider = state.serviceProvider;
  settingCfg.baseUrl = state.baseUrl;
  settingCfg.defaultModel = 'gpt-4o-mini-2024-07-18';
  settingCfg.azureDeployment = 'gpt-4o';
  settingCfg.scmModel = 'gpt-4o-mini-2024-07-18';
  settingCfg.scmDeployment = 'gpt-4o';
  settingCfg.embeddingModel = 'text-embedding-ada-002';
  settingCfg.embeddingsDeployment = 'text-embedding-ada-002';
  settingCfg.azureApiVersion = '2024-06-01';
}
