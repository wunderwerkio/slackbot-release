"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyChangelog = notifyChangelog;
const mack_1 = require("@instantish/mack");
const webhook_1 = require("./webhook");
function notifyChangelog(_a) {
    return __awaiter(this, arguments, void 0, function* ({ inputs, release, repo }) {
        const prefix = inputs.headerPrefix ? `${inputs.headerPrefix} ` : "";
        const introBlock = {
            type: "header",
            text: {
                type: "plain_text",
                text: `:rocket: ${prefix}Release: ${release.name}`,
            },
        };
        const linkBlock = {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `<${release.html_url}>`,
            },
        };
        const dividerBlock = { type: "divider" };
        const bodyBlocks = yield (0, mack_1.markdownToBlocks)(release.body);
        return yield (0, webhook_1.postWebhook)(inputs.slackWebhookUrl, {
            text: `${release.name} has been released in ${repo.owner}/${repo.repo}`,
            blocks: [introBlock, linkBlock, dividerBlock, ...bodyBlocks],
        });
    });
}
