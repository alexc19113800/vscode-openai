export interface IConfigurationSetting {
  serviceProvider: string;
  baseUrl: string;
  defaultModel: string;
  scmModel: string;
  embeddingModel: string;
  azureDeployment: string;
  scmDeployment: string;
  embeddingsDeployment: string;
  azureApiVersion: string;
  authenticationType: string;
  host: string;
  inferenceUrl: string;
  embeddingUrl: string;
}
