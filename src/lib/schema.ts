import { z } from "zod";

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: "ユーザー名を入力してください" })
    .max(20, { message: "ユーザー名は20文字以内にしてください" })
    .nullable(),

  birthday: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "有効な日付を入力してください",
    })
    .nullable()
    .optional(),

  avatar_url: z
    .string()
    .url({ message: "有効なURLを入力してください" })
    .nullable()
    .optional(),
});

export type ProfileSchema = z.infer<typeof ProfileSchema>;
