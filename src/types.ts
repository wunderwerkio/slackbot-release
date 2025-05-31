export interface ActionInputs {
  slackWebhookUrl: string;
  headerPrefix?: string;
}

export interface Repository {
  repo: string;
  owner: string;
}

export interface Release {
  html_url: string;
  name: string;
  body: string;
}