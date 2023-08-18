# 実施レポート

## 各種質問事項

> 課題の取り組み開始から完了までに要した合計時間

20時間程

> これまでの総合的なプログラミング歴

5年半

> これまでのWEBフロントエンドプログラミング歴

3年

## 着手にあたり参考にしたページや書籍、リポジトリがあれば

- 各種ドキュメント
  - [Recharts](https://recharts.org/en-US)
  - [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
  - [Vite](https://vitejs.dev/guide/)
  - [Vitest](https://vitest.dev/guide/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [pnpm](https://pnpm.io/continuous-integration)
  - [tailwindcss](https://tailwindcss.com/docs/installation)
  - [playwright](https://playwright.dev/docs/intro)
- 記事
  - [API キーを隠すための Proxy Server を Vercel Serveless Function で実装する](https://zenn.dev/mr_ozin/articles/17920ca403b8af)
  - [Vercel はもっと薄く使える](https://zenn.dev/you_5805/articles/vanilla-vercel-functions)
  - [Next.js Serverless Functions APIを使ってみました](https://tech.012grp.co.jp/entry/2021/05/12/150246)
  - [Vite+React+TypeScriptに テスト環境 Jest＋TesttingLibrary をステップbyステップで作る](https://zenn.dev/longbridge/articles/9e9758181c8846)
  - [Vitestで@testing-library/jest-domのtoBeInTheDocumentを使うときのTS型エラーをなんとかする](https://zenn.dev/convcha/articles/1148fd4aa662fd)
- Issue（主にエラーの解消のため）
  - [Vercel dev CLI using old typescript version](https://github.com/vercel/vercel/issues/8680)

## AIを利用した場合成果があれば簡潔なレポート（ボーナス要素）

### ChatGPT

GithubActionsのワークフローの生成や、`utils/getRandomColor`や`lib/fetchAll`、`lib/fetchOnce`関数等の汎用的に使える関数の生成、またそれらのテストコードの生成に利用しました。また、Vitestのセットアップ等でなかなか自分で解決策となる記事やIssueを見つけられなかった際に質問すると、その質問に対する回答を生成してくれたり、質問の内容を整理してくれたりしました。ただしvitestの情報はあまりなく、基本的にjestを利用したコードや回答が生成されたので、vitestに意訳して適用する必要がありました。

### Github Copilot

コーディング時に全体的に利用しました。簡単な関数名や、関数やオブジェクトの型を記載するとそれに合わせてよしなに生成してくれたので重宝しました。ただ体感3割くらいの割合で推論されたコードやコメント文がおかしいことがあり、あくまで参考程度に利用しました。

### [aicommits](https://github.com/Nutlope/aicommits)

`git add`でステージしているファイルの差分を参照し、よしなにコミット文を生成してくれるツールで、これはかなり重宝しました。あまり多くのファイルを投げるとエラーになってしまうので、コミットを細かくする癖がつけられてよかったです。ただし自分でOpenAIのAPIキーを登録する必要があるので、大量に利用し続けると課金が発生する可能性があります。
参考までに、今回の実装を通して、56回のコミット文を生成したところ、$0.1程度の課金が発生しました。
