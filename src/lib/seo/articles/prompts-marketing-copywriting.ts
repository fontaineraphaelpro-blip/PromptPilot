import type { SeoArticle } from "../types";
import { estimateReadingTime } from "./utils";

const blocks: SeoArticle["blocks"] = [
  {
    type: "p",
    text: "Le marketing et le copywriting sont parmi les cas d'usage IA les plus rentables — et les plus décevants quand le prompt se limite à « écris un post LinkedIn ». En 2026, les équipes qui performent injectent dans leurs prompts : persona acheteur, objection principale, preuve sociale disponible, canal de diffusion, contraintes légales marque, et format de sortie strict. Sans cela, ChatGPT et Claude produisent du remplissage creux, interchangeable, sans conversion.",
  },
  {
    type: "p",
    text: "Ce guide pratique couvre landing pages, séquences email, ads Meta/Google/LinkedIn, réseaux sociaux, scripts vidéo court, frameworks copy (PAS, AIDA), checklists prompts, erreurs marketing-specific, et FAQ.",
  },
  { type: "h2", text: "Pourquoi le marketing exige des prompts différents" },
  {
    type: "p",
    text: "Un dev prompt pour compiler ; un marketer prompt pour persuader un humain spécifique à un moment spécifique du funnel. Variables critiques : awareness level (problem-aware vs product-aware), objection dominante (prix, confiance, timing), preuve (témoignage, chiffre, étude de cas), CTA unique, cohérence ton de marque. Omettre une = copy générique.",
  },
  {
    type: "blockquote",
    text: "Bon prompt marketing = brief créatif complet. L'IA est votre junior copywriter — pas votre stratège sans données.",
  },
  { type: "h2", text: "Framework prompt marketing (R-C-T-C enrichi)" },
  {
    type: "ol",
    items: [
      "Rôle : copywriter [B2B/B2C] spécialiste [canal]",
      "Contexte : produit, persona, stage funnel, concurrents, preuves dispo",
      "Tâche : livrable unique (hero, email J+3, ad variant B…)",
      "Contraintes : longueur, ton, interdits légaux/superlatifs, format, CTA",
      "Bonus : objection à adresser explicitement dans le copy",
    ],
  },
  { type: "h2", text: "Landing page : prompt structuré" },
  {
    type: "p",
    text: "Structure recommandée dans le prompt : hero (problème + promesse), bénéfices (3), preuve (témoignage/chiffre), how it works (3 steps), FAQ objections (4), CTA final. Précisez longueur par section et interdisez superlatifs non sourcés (« leader », « révolutionnaire »).",
  },
  {
    type: "p",
    text: "Exemple prompt : « Tu es copywriter B2B SaaS conversion. Produit : PromptExpert, générateur prompts freemium. Persona : marketer PME 5-20 pers, frustré prompts inconsistants équipe. Objection : pourquoi pas Notion templates ? Rédige landing sections hero + benefits + FAQ 4 Q. Ton pro accessible FR, 900 mots total, CTA essai gratuit, PAS framework hero. »",
  },
  { type: "h2", text: "Email sequences : prompts par email" },
  {
    type: "ul",
    items: [
      "Email 1 onboarding : problème + empathie, pas de pitch dur — prompt inclut « zero product mention until paragraph 3 »",
      "Email 2 : solution + mini case study placeholder [CLIENT]",
      "Email 3 : objection pricing + ROI framing",
      "Email 4 : urgence douce + CTA — prompt précise deadline si réelle, sinon interdit fake scarcity",
      "Chaque prompt : objet 45 car max, préheader, PS optionnel, mots corps",
    ],
  },
  { type: "h2", text: "Ads : Meta, Google, LinkedIn" },
  {
    type: "h3",
    text: "Prompt ads multi-variantes",
  },
  {
    type: "p",
    text: "« Génère 5 variantes ad Meta primary text 125 car + headline 40 car. Angles : peur rater (FOMO soft), gain temps chiffré, preuve sociale, statut pro, curiosity hook. Produit [X], persona [Y]. Interdit : before/after santé, promesses garanties. Tableau markdown angle / primary / headline. »",
  },
  {
    type: "h3",
    text: "Google RSA"
  },
  {
    type: "p",
    text: "Précisez limites caractères strictes par asset, 15 headlines / 4 descriptions, inclusion mot-clé [keyword] dans 5 headlines minimum.",
  },
  { type: "h2", text: "Réseaux sociaux : LinkedIn, Instagram, TikTok" },
  {
    type: "p",
    text: "LinkedIn : hook question first line, 150-200 mots, 3 bullets actionnables, CTA comment/DM. Instagram : caption 120 mots + hashtags prompt séparé 15 tags niche. TikTok script : hook 3 sec, problem, solution demo, CTA — timestamps dans prompt.",
  },
  { type: "h2", text: "Copywriting frameworks dans prompts" },
  {
    type: "ul",
    items: [
      "PAS (Problem-Agitate-Solution) — emails, ads pain-driven",
      "AIDA (Attention-Interest-Desire-Action) — landing longue",
      "BAB (Before-After-Bridge) — transformation stories",
      "4P (Promise-Picture-Proof-Push) — sales page",
      "Nommez framework explicitement dans prompt : « structure PAS strict »",
    ],
  },
  { type: "h2", text: "Brand voice : prompts récurrents" },
  {
    type: "p",
    text: "Créez Custom GPT ou doc brand voice : mots autorisés/interdits, exemples posts gold standard, niveau humour (0-10), réferences concurrents à éviter. Prompt type : « Applique BRAND_VOICE.doc. Dévie si conflit avec contrainte légale. »",
  },
  { type: "h2", text: "Erreurs prompts marketing" },
  {
    type: "ol",
    items: [
      "Demander « viral » sans audience définie",
      "Oublier objection #1 persona",
      "Mélanger TOFU et BOFU copy même prompt",
      "Chiffres inventés — toujours placeholder ou data fournie",
      "Pas de A/B : demander minimum 3 angles",
      "Ignorer contraintes légales secteur (finance, santé, RGPD claims)",
    ],
  },
  {
    type: "tip",
    title: "PromptExpert marketing",
    text: "Type Marketing + canal cible : prompt R-C-T-C avec persona, objections, formats caractères selon IA choisie.",
  },
  { type: "h2", text: "Questions fréquentes (People Also Ask)" },
  { type: "h3", text: "ChatGPT ou Claude pour copywriting ?" },
  {
    type: "p",
    text: "ChatGPT variantes rapides punchy ; Claude nuance objections B2B long form. Testez hooks. Voir comparatif ChatGPT vs Claude.",
  },
  { type: "h3", text: "L'IA remplace-t-elle copywriter ?" },
  {
    type: "p",
    text: "Accélère brouillons et variantes. Stratégie, preuves réelles, validation légale restent humaines. Prompt = brief junior.",
  },
  { type: "h3", text: "Comment éviter copy générique IA ?" },
  {
    type: "p",
    text: "Contexte hyper-spécifique : niche, chiffres réels, citations clients, interdits mots buzz. Itérer ton « trop corporate » en prompt suivi.",
  },
  { type: "h2", text: "Prompts SEO et contenu long" },
  {
    type: "p",
    text: "Article blog 2000 mots : ne demandez pas tout d'un coup. Prompt 1 outline H2/H3 + PAA. Prompt 2 rédige section 1-2. Prompt 3 sections 3-4. Prompt 4 intro/conclusion/meta. Prompt 5 relecture cohérence keyword [X] sans stuffing. Chaîne bat monolithe.",
  },
  { type: "h2", text: "Compliance et prompts marketing" },
  {
    type: "p",
    text: "Secteurs régulés (finance, santé, juridique) : ajoutez contraintes « pas de promesse rendement garanti », « disclaimer obligatoire [texte] », « conformité RGPD mention consentement si email ». Relecture humaine compliance non négociable.",
  },
  { type: "h2", text: "Prochaine étape" },
  {
    type: "p",
    text: "Comment écrire prompt ChatGPT, 10 erreurs prompt IA, exemples prompts gratuits section marketing.",
  },
  { type: "h2", text: "Calendrier éditorial via prompts" },
  {
    type: "p",
    text: "Prompt planification : « Génère calendrier 4 semaines LinkedIn pour [marque]. 3 posts/semaine. Mix éducatif 40%, preuve 30%, produit 20%, culture 10%. Tableau date / angle / hook draft / CTA. Persona [X]. » Puis un prompt par post — jamais les 12 posts d'un coup.",
  },
  { type: "h2", text: "Personas et prompts marketing" },
  {
    type: "p",
    text: "Créez fiche persona 200 mots : démographie, job-to-be-done, objection #1, canal préféré, vocabulaire qu'il utilise vs rejette. Collez en tête de CHAQUE prompt marketing. L'IA cesse de parler à « tout le monde ». Exemple : fondateur SaaS 35 ans, time-poor, sceptique hype IA, lit LinkedIn mobile 7h-8h, convertit sur preuve pairs PME similaires.",
  },
  { type: "h2", text: "Synthèse copywriting IA" },
  {
    type: "p",
    text: "Prompts marketing performants fusionnent R-C-T-C, persona précis, frameworks copy nommés, contraintes canal, compliance. Un prompt par asset, chaîne pour campagnes. Relecture humaine conversion et legal non négociable. Exemples gratuits section marketing + PromptExpert pour socle rapide.",
  },
  { type: "h2", text: "FAQ prompts marketing" },
  { type: "h3", text: "Prompt landing page qui convertit : secret ?" },
  {
    type: "p",
    text: "Pas secret — persona + objection + preuve + CTA unique + format sections. Itérer hook hero 5 variantes prompt séparé.",
  },
  { type: "h3", text: "Prompts LinkedIn B2B sans sounding IA ?" },
  {
    type: "p",
    text: "Interdisez buzzwords liste, exigez anecdote placeholder [VOTRE HISTOIRE], ton conversationnel pro, lecture à voix haute test humain.",
  },
  { type: "h2", text: "Campagne multicanal : ordre des prompts" },
  {
    type: "p",
    text: "Séquence efficace : (1) stratégie message unique (2) landing hero (3) emails dérivés même angle (4) social snippets (5) ads retargeting. Chaque étape prompt référence output validé précédent — cohérence cross-canal. Ne parallélisez pas sans message strategy approuvée.",
  },
  { type: "h2", text: "Métriques copy IA à suivre" },
  {
    type: "p",
    text: "CTR ads, open rate email, conversion landing, time on page — comparez variants prompt A vs B, pas « feeling ». Archivez prompt + metrics winner. Refresh trimestriel car fatigue créative. Combinez prompts marketing avec exemples gratuits templates puis data-driven iteration.",
  },
  {
    type: "p",
    text: "Brand voice doc + persona + R-C-T-C = triptyque non négociable avant scale production copy IA équipe marketing >5 personnes.",
  },
  { type: "h2", text: "Bibliothèque prompts marketing équipe" },
  {
    type: "tip",
    title: "Persona first",
    text: "Collez fiche persona 200 mots en tête de chaque prompt marketing — conversion suit.",
  },
  {
    type: "p",
    text: "Prompts marketing copywriting performants = process équipe, pas lone genius. Bibliothèque Notion + metrics + PromptExpert socle = stack PME 2026. Lisez comment écrire prompt ChatGPT et 10 erreurs en complément.",
  },
  { type: "h2", text: "Exemple campagne complète prompts marketing" },
  {
    type: "p",
    text: "Semaine lancement produit : J1 prompt stratégie message + persona. J2 prompt landing hero PAS validé. J3 prompts 3 emails séquence même angle. J4 prompts 5 LinkedIn + 3 Meta ads variantes. J5 relecture cohérence cross-prompts. Chaque prompt R-C-T-C autonome référence outputs validés précédents collés en contexte. Metrics J+14 alimentent retro prompts winners archive. Itération campagne suivante part bibliothèque — pas zero.",
  },
  { type: "h2", text: "Conclusion marketing copywriting IA" },
  {
    type: "p",
    text: "Prompts marketing performants exigent persona, frameworks copy, contraintes canal et relecture humaine — pas prompt one-liner magique. Industrialisez bibliothèque Notion, metrics A/B, PromptExpert socle R-C-T-C. Campagnes multi-prompts chaînées battent monolithes. Hub lié : chatgpt-vs-claude choix modèle copy, 10-erreurs-prompt-ia pièges, comment-faire-un-bon-prompt-ia fondations, comment-ecrire-prompt-chatgpt exécution, exemples-prompts-ia-gratuits templates démarrage rapide campagnes.",
  },
  {
    type: "blockquote",
    text: "L'IA ne connaît pas votre cliente idéale — votre prompt persona doit la lui apprendre à chaque fois.",
  },
  {
    type: "ol",
    items: [
      "Fiche persona 200 mots en tête prompt",
      "Framework copy nommé PAS AIDA",
      "Un prompt par asset canal",
      "Chaîne campagne séquentielle",
      "Metrics A/B archive winners",
      "Brand voice doc versionné",
      "Relecture humaine claims chiffrés",
      "PromptExpert socle R-C-T-C rapidité",
      "Retro metrics J+14 alimente bibliothèque winners",
    ],
  },
];

export const articleMarketing: SeoArticle = {
  slug: "prompts-marketing-copywriting",
  title: "Prompts IA marketing et copywriting : guide pratique 2026",
  description:
    "Prompts ChatGPT/Claude pour landing, emails, ads, social : frameworks PAS/AIDA, exemples, brand voice et erreurs marketing.",
  category: "guide",
  publishedAt: "2026-04-01",
  updatedAt: "2026-05-30",
  readingTimeMin: estimateReadingTime(blocks),
  keywords: [
    "prompt marketing",
    "copywriting IA",
    "prompt réseaux sociaux",
    "prompt landing page",
    "ChatGPT marketing",
  ],
  relatedSlugs: [
    "comment-ecrire-prompt-chatgpt",
    "10-erreurs-prompt-ia",
    "exemples-prompts-ia-gratuits",
    "chatgpt-vs-claude-prompts",
  ],
  blocks,
};
