import { z } from "zod";
import {
  DETAIL_LEVELS,
  LANGUAGES,
  TARGET_AIS,
  TASK_TYPES,
  TONES,
} from "@/lib/constants";

export const generatePromptSchema = z.object({
  userIdea: z
    .string()
    .min(10, "Décrivez votre idée en au moins 10 caractères")
    .max(5000, "Maximum 5000 caractères"),
  targetAI: z.enum(TARGET_AIS),
  taskType: z.enum(TASK_TYPES),
  detailLevel: z.enum(DETAIL_LEVELS),
  tone: z.enum(TONES),
  language: z.enum(LANGUAGES),
  includeConstraints: z.boolean(),
  includeExamples: z.boolean(),
  includeOutputFormat: z.boolean(),
  includeQualityChecklist: z.boolean(),
  includeErrorsToAvoid: z.boolean(),
});

export type GeneratePromptFormValues = z.infer<typeof generatePromptSchema>;
