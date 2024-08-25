import * as z from 'zod'; // zodを使って、フィールドのスキーマを定義します
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
export const converter = <T extends z.AnyZodObject>(
  schema: T,
): FirestoreDataConverter<z.infer<T>> => ({
  toFirestore: (data: z.infer<T>): DocumentData => {
    return schema.strict().parse(data);
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<z.infer<T>>): z.infer<T> => {
    return schema.strict().parse(snapshot.data());
  },
});

const testSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  age: z.number().min(18, '18歳以上である必要があります'),
});

// スキーマをもとに型を作成
export type Test = z.infer<typeof testSchema>;

// スキーマをもとにコンバーターを作成
export const testConverter = converter(testSchema);
