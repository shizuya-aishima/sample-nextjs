import { converter, metaSchema } from '@/lib/firebase/utils';
import * as z from 'zod';

export const recipeSchema = z.object({
  name: z
    .string()
    .min(1, '名前は必須です')
    .max(100, '100文字以内にしてください'),
  count: z.coerce.number(),
});
export const recipeSearchSchema = recipeSchema.extend({
  name: z.string().max(100, '100文字以内にしてください').optional(),
});

export const recipeFromSchema = recipeSearchSchema.pick({
  name: true,
});
const firebaseRecipe = metaSchema.merge(recipeSchema);
export type RecipeType = z.infer<typeof firebaseRecipe>;
export type RecipeSearchType = z.infer<typeof recipeSearchSchema>;
export type RecipeFormType = z.infer<typeof recipeFromSchema>;

// スキーマをもとにコンバーターを作成
export const recipeSelectConverter = converter(firebaseRecipe);
export const recipeCreateConverter = converter(recipeSchema);
