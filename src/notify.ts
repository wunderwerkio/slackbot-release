import type {
  Block,
  DividerBlock,
  HeaderBlock,
  SectionBlock,
} from "@slack/types";
import { markdownToBlocks } from "@instantish/mack";
import { ActionInputs, Release, Repository } from "./types";
import { postWebhook } from "./webhook";

interface Args {
  inputs: ActionInputs;
  release: Release;
  repo: Repository;
}

export async function notifyChangelog({ inputs, release, repo }: Args) {
  const prefix = inputs.headerPrefix ? `${inputs.headerPrefix} ` : "";

  const introBlock: HeaderBlock = {
    type: "header",
    text: {
      type: "plain_text",
      text: `:rocket: ${prefix}Release: ${release.name}`,
    },
  };

  const linkBlock: SectionBlock = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `<${release.html_url}>`,
    },
  };

  const dividerBlock: DividerBlock = { type: "divider" };

  const bodyBlocks: Block[] = await markdownToBlocks(release.body);

  return await postWebhook(inputs.slackWebhookUrl, {
    text: `${release.name} has been released in ${repo.owner}/${repo.repo}`,
    blocks: [introBlock, linkBlock, dividerBlock, ...bodyBlocks],
  });
}
