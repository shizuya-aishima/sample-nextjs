import { converter, metaSchema } from '@/lib/firebase/utils';
import * as z from 'zod';

export const materialSchema = z.object({
  name: z
    .string()
    .min(1, '名前は必須です')
    .max(100, '100文字以内にしてください'),
  count: z.coerce.number(),
});
export const materialSearchSchema = materialSchema.extend({
  name: z.string().max(100, '100文字以内にしてください').optional(),
});

export const materialFromSchema = materialSearchSchema.pick({
  name: true,
});
const firebaseMaterial = metaSchema.merge(materialSchema);
export type MaterialType = z.infer<typeof firebaseMaterial>;
export type MaterialSearchType = z.infer<typeof materialSearchSchema>;
export type MaterialFormType = z.infer<typeof materialFromSchema>;

// スキーマをもとにコンバーターを作成
export const materialSelectConverter = converter(firebaseMaterial);
export const materialCreateConverter = converter(materialSchema);
