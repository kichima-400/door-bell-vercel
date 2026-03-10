# door-bell  

  ---
  デプロイ手順

  1. GitHub にリポジトリを作成して push

  cd door-bell
  git init
  git add .
  git commit -m "initial commit"
  # GitHub でリポジトリ作成後
  git remote add origin https://github.com/あなたのユーザー名/door-bell.git
  git push -u origin main

  2. Vercel にデプロイ

  1. https://vercel.com にアクセス → GitHub アカウントでサインイン
  2. Add New Project → door-bell リポジトリを選択 → Deploy
  3. デプロイ完了後、Settings → Environment Variables に以下を追加：

  ┌─────────────┬─────────────────────────────┐
  │    Name     │            Value            │
  ├─────────────┼─────────────────────────────┤
  │ BOT_TOKEN   │ xoxb-...（Slack Bot Token） │
  ├─────────────┼─────────────────────────────┤
  │ WEBHOOK_URL │ Slack Incoming Webhook URL  │
  └─────────────┴─────────────────────────────┘

  4. Redeploy して環境変数を反映
  5. 発行された URL（例: https://door-bell-xxx.vercel.app）をメモ

  3. Slack App に URL を設定

  - Interactivity & Shortcuts → Request URL: https://door-bell-xxx.vercel.app/api/slack
  - Event Subscriptions → Request URL: 同じ URL → app_home_opened を Subscribe → Save

  ---
  Slack App 側の設定（Bot Token の取得など）はまだ済んでいますか？

✻ Churned for 44s

> slackApp側の設定が済んでいない。やり方教えて

● Slack App の設定手順

  Step 1: App を作成

  1. https://api.slack.com/apps を開く
  2. Create New App → From scratch
  3. App Name: DoorBell
  4. Workspace: あなたのワークスペースを選択
  5. Create App

  ---
  Step 2: Incoming Webhook を有効化

  1. 左メニュー Incoming Webhooks → トグルを ON
  2. Add New Webhook to Workspace
  3. チャネル: #please-open-the-door を選択 → 許可する
  4. 生成された https://hooks.slack.com/services/XXX/XXX/XXX をコピーしてメモ

  ---
  Step 3: Bot Token を取得

  1. 左メニュー OAuth & Permissions
  2. Scopes → Bot Token Scopes → Add an OAuth Scope で以下を追加：
    - chat:write
  3. ページ上部 Install to Workspace → 許可する
  4. 表示された Bot User OAuth Token（xoxb-...）をコピーしてメモ

  ---
  Step 4: App Home を有効化

  1. 左メニュー App Home
  2. Show Tabs セクションで Home Tab を ON
  3. 「Allow users to send Slash commands and messages from the messages tab」は OFF のままでOK

  ---
  Step 5: Event Subscriptions を設定

  ※ 先に Vercel のデプロイが完了している必要があります

  1. 左メニュー Event Subscriptions → ON
  2. Request URL に https://あなたのURL.vercel.app/api/slack を入力
  3. Slack が自動で検証（Verified と表示されればOK）
  4. Subscribe to bot events → Add Bot User Event → app_home_opened を追加
  5. Save Changes

  ---
  Step 6: Interactivity を設定

  1. 左メニュー Interactivity & Shortcuts → ON
  2. Request URL に同じ URL https://あなたのURL.vercel.app/api/slack を入力
  3. Save Changes

  ---
  Step 7: Vercel に環境変数を登録

  Step 2 と Step 3 でメモした値を Vercel に設定します。

  1. Vercel のプロジェクト → Settings → Environment Variables
  2. 以下を追加：

  ┌─────────────┬──────────────────────────────────────┐
  │    Name     │                Value                 │
  ├─────────────┼──────────────────────────────────────┤
  │ BOT_TOKEN   │ xoxb-...                             │
  ├─────────────┼──────────────────────────────────────┤
  │ WEBHOOK_URL │ https://hooks.slack.com/services/... │
  └─────────────┴──────────────────────────────────────┘

  3. Deployments → 最新のデプロイ → Redeploy で反映

  ---
  Step 8: 動作確認

  1. Slack で左メニュー Apps → 検索で DoorBell を追加
  2. Home タブを開く
  3. 「🚪 ドア開けて！」ボタンをタップ
  4. #please-open-the-door にメッセージが届けばOK

  ---
