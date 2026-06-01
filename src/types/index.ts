import type { DetailLevel, Language, Plan, TargetAI, TaskType, Tone } from "@/lib/constants";

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  plan: Plan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  preferred_language: Language;
  created_at: string;
  updated_at: string;
}

export interface PromptScoreBreakdown {
  clarity: number;
  constraints: number;
  outputFormat: number;
  aiAdaptation: number;
}

export interface PromptRecord {
  id: string;
  user_id: string;
  original_idea: string;
  target_ai: TargetAI;
  task_type: TaskType;
  detail_level: DetailLevel;
  tone: Tone;
  language: Language;
  generated_prompt: string;
  short_variant: string;
  detailed_variant: string;
  expert_variant: string;
  ai_tips: string;
  is_favorite: boolean;
  tags: string[];
  prompt_score: number | null;
  score_breakdown: PromptScoreBreakdown | null;
  preview_summary: string;
  preview_questions: string[];
  share_token: string | null;
  share_enabled: boolean;
  copy_feedback?: string | null;
  created_at: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  target_ai: TargetAI;
  description: string;
  content: string;
  is_premium: boolean;
  created_at: string;
}

export interface DailyUsage {
  id: string;
  user_id: string;
  date: string;
  prompt_count: number;
}

export interface GeneratePromptInput {
  userIdea: string;
  targetAI: TargetAI;
  taskType: TaskType;
  detailLevel: DetailLevel;
  tone: Tone;
  language: Language;
  includeConstraints: boolean;
  includeExamples: boolean;
  includeOutputFormat: boolean;
  includeQualityChecklist: boolean;
  includeErrorsToAvoid: boolean;
}

export interface GeneratePromptResult {
  generated_prompt: string;
  short_variant: string;
  detailed_variant: string;
  expert_variant: string;
  ai_tips: string;
  preview_summary?: string;
  preview_questions?: string[];
  prompt_score?: number;
  score_breakdown?: PromptScoreBreakdown;
}
