# 都道府県別の総人口推移グラフ

[デプロイ済みURL](https://yumemi-fe-coding-test-tongari.vercel.app/)

## 概要

株式会社ゆめみ様の[フロントエンドコーディング試験](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)の課題

**都道府県別の総人口推移グラフを表示するSPA(Single Page Application)**

## 開発環境

Vercelにデプロイしているため、Vercelのプロジェクトを作成する必要がある

### 環境変数の設定

| 変数名             | 説明                                                | 値                                                                                  |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| VITE_API_BASE_URL  | Vercel Serverless FunctionにデプロイされたURLを指定 | Developmentにはhttp://localhost:3000を指定。ProductionはProduction環境のURLを指定。 |
| RESAS_API_ENDPOINT | RESAS APIのエンドポイントを指定。                   | https://opendata.resas-portal.go.jp                                                 |
| RESAS_API_KEY      | RESAS APIのAPIキー                                  | [RESAS](https://opendata.resas-portal.go.jp/)公式ページより取得                     |

### Vercelから環境変数をインポート

`pnpm prepare-env`

### ローカル環境立ち上げ

`pnpm start`

内部で`vercel dev`を実行している

エンドポイントは[http://localhost:3000/]でアクセス可能
api配下のエンドポイントは`http://localhost:3000/api/hoge`でアクセス可能

### ビルド

`pnpm build`

### ESLint

`pnpm lint`

### テスト

watchモードでテストを実行
`pnpm test`

CI内では下記を実行
`pnpm test:run`

## API仕様

### 都道府県一覧取得

#### Request

`GET /api/getPrefectures`

#### Response

```ts
type APIResponse = {
  prefCode: string
  prefName: string
}[]
```

### 都道府県別の総人口推移取得

#### Request

`GET /api/getPopulationComposition`

| パラメータ名 | 必須 | 型     | 説明           |
| ------------ | ---- | ------ | -------------- |
| prefCode     | ○    | 文字列 | 都道府県コード |

#### Response

```ts
type APIResponse = {
  prefCode: string
  data?: {
    year: number
    value: number
  }[]
}
```
