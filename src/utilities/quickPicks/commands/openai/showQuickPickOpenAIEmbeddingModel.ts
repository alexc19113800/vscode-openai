import { ModelCapability } from '@app/apis/openai';
import { MultiStepInput } from '@app/apis/vscode';
import { getAvailableModelsOpenai } from '@app/utilities/quickPicks';
import { IQuickPickSetup } from '../../interface';
import { shouldResume } from '../shouldResume';

export async function showQuickPickOpenAIEmbeddingModel(
  input: MultiStepInput,
  state: Partial<IQuickPickSetup>
): Promise<void> {
  state.step = (state.step ?? 0) + 1;
  const models = await getAvailableModelsOpenai(
    state.authApiKey!,
    state.baseUrl!,
    ModelCapability.Embedding
  );
  state.modelEmbedding = await input.showQuickPick({
    title: state.title!,
    step: state.step,
    totalSteps: state.totalSteps!,
    ignoreFocusOut: true,
    placeholder: 'Selected embedding model (if empty, no valid models found)',
    items: models,
    activeItem: state.modelEmbedding,
    shouldResume: shouldResume,
  });
}
