import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // 新しくこのオブジェクトを追加します
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // "error"から"warn"（警告）にすることで、ビルドが止まらないようにする
        {
          argsIgnorePattern: "^_", // アンダースコアで始まる引数を無視する
          varsIgnorePattern: "^_", // アンダースコアで始まる変数を無視する
          caughtErrorsIgnorePattern: "^_", // catch句のエラー変数も無視する
        },
      ],
    },
  },
];

export default eslintConfig;
