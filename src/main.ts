import * as core from "@actions/core";
import * as github from "@actions/github";
import { ActionInputs } from "./types";
import type { ReleasePublishedEvent } from "@octokit/webhooks-types";
import { notifyChangelog } from "./notify";

async function run() {
  try {
    core.debug("Trying to send release notification to slack...");

    const inputs: ActionInputs = {
      slackWebhookUrl: core.getInput("slackWebhookUrl"),
    };

    const context = github.context;
    const { eventName, repo } = context;
    if (eventName !== "release") {
      throw new Error("This action can only be used in a release event");
    }

    const payload = context.payload as ReleasePublishedEvent;
    await notifyChangelog({
      inputs,
      release: payload.release,
      repo,
    });

    core.debug(`Successfully sent release notification to slack`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unknown error occurred");
    }
  }
}
