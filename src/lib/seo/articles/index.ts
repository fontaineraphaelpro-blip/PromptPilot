import type { SeoArticle } from "../types";
import { articleCommentFaireBonPrompt } from "./comment-faire-un-bon-prompt-ia";
import { articleQuestCeQuunPrompt } from "./quest-ce-quun-prompt-ia";
import { articleQuestCeQuePromptEngineering } from "./quest-ce-que-le-prompt-engineering";
import { articleStructureRctc } from "./structure-prompt-expert-framework";
import { articleCommentEcrireChatgpt } from "./comment-ecrire-prompt-chatgpt";
import { articleUtiliserChatgptEfficacement } from "./comment-utiliser-chatgpt-efficacement";
import { articleChatgptMauvaiseReponse } from "./chatgpt-mauvaise-reponse-comment-formuler";
import { articlePromptsCursor } from "./prompts-cursor-guide-developpeur";
import { articleChatgptVsClaude } from "./chatgpt-vs-claude-prompts";
import { articleMidjourneyVsDalle } from "./midjourney-vs-dalle-prompts";
import { articleMidjourneyDebutant } from "./prompt-midjourney-debutant-guide";
import { articleDixErreurs } from "./10-erreurs-prompt-ia";
import { articleMarketing } from "./prompts-marketing-copywriting";
import { articleVideo } from "./prompts-video-sora-runway";
import { articleExemplesGratuits } from "./exemples-prompts-ia-gratuits";
import { articlePromptpilotVsManuel } from "./promptpilot-vs-prompts-manuels";

export const SEO_ARTICLES: SeoArticle[] = [
  articleQuestCeQuunPrompt,
  articleCommentFaireBonPrompt,
  articleQuestCeQuePromptEngineering,
  articleStructureRctc,
  articleCommentEcrireChatgpt,
  articleUtiliserChatgptEfficacement,
  articleChatgptMauvaiseReponse,
  articlePromptsCursor,
  articleChatgptVsClaude,
  articleMidjourneyVsDalle,
  articleMidjourneyDebutant,
  articleDixErreurs,
  articleMarketing,
  articleVideo,
  articleExemplesGratuits,
  articlePromptpilotVsManuel,
];
