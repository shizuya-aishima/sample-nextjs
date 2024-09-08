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
    return schema.strict().parse({ ...snapshot.data(), id: snapshot.id });
  },
});
