import * as z from 'zod';

export const materialSchema = z.object({
  name: z
    .string()
    .min(1, '名前は必須です')
    .max(100, '100文字以内にしてください'),
});

export type MaterialType = z.infer<typeof materialSchema>;
