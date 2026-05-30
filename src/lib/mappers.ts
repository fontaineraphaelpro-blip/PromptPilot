import type { Profile, PromptRecord, Template } from "@/types";
import type { Plan, TargetAI } from "@/lib/constants";
import type { Profile as PrismaProfile, Prompt, Template as PrismaTemplate } from "@prisma/client";

export function mapProfile(row: PrismaProfile): Profile {
  return {
    id: row.id,
    user_id: row.userId,
    email: row.email,
    plan: row.plan as Plan,
    stripe_customer_id: row.stripeCustomerId,
    stripe_subscription_id: row.stripeSubscriptionId,
    preferred_language: row.preferredLanguage as Profile["preferred_language"],
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  };
}

export function mapPrompt(row: Prompt): PromptRecord {
  return {
    id: row.id,
    user_id: row.userId,
    original_idea: row.originalIdea,
    target_ai: row.targetAi as TargetAI,
    task_type: row.taskType as PromptRecord["task_type"],
    detail_level: row.detailLevel as PromptRecord["detail_level"],
    tone: row.tone as PromptRecord["tone"],
    language: row.language as PromptRecord["language"],
    generated_prompt: row.generatedPrompt,
    short_variant: row.shortVariant,
    detailed_variant: row.detailedVariant,
    expert_variant: row.expertVariant,
    ai_tips: row.aiTips,
    is_favorite: row.isFavorite,
    created_at: row.createdAt.toISOString(),
  };
}

export function mapTemplate(row: PrismaTemplate): Template {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    target_ai: row.targetAi as TargetAI,
    description: row.description,
    content: row.content,
    is_premium: row.isPremium,
    created_at: row.createdAt.toISOString(),
  };
}
