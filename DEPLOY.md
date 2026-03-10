# DoorBell デプロイ手順

Slack の App Home タブにボタンを追加し、タップするだけでチャネルに通知を送るアプリ。

## 構成

```
door-bell/
├── api/
│   └── slack.js      # Vercel サーバーレス関数
├── package.json
└── .env.example      # 環境変数テンプレート
```

| 要素 | 使うもの | 費用 |
|---|---|---|
| Slack App（UI） | Slack API | 無料 |
| サーバー | Vercel | 無料 |
| チャネル投稿 | Incoming Webhook | 無料 |

---

## 1. GitHub にリポジトリを作成して push

```bash
cd door-bell
git init
git add .
git commit -m "initial commit"
# GitHub でリポジトリ作成後
git remote add origin https://github.com/あなたのユーザー名/door-bell.git
git push -u origin main
```

---

## 2. Vercel にデプロイ

1. https://vercel.com にアクセス → GitHub アカウントでサインイン
2. **Add New Project** → `door-bell` リポジトリを選択 → **Deploy**
3. デプロイ完了後に表示される URL をメモ
   例: `https://door-bell-xxx.vercel.app`

---

## 3. Slack App を作成

1. https://api.slack.com/apps を開く
2. **Create New App** → **From scratch**
3. App Name: `DoorBell` / Workspace: あなたのワークスペース → **Create App**

---

## 4. Incoming Webhook を有効化

1. 左メニュー **Incoming Webhooks** → **ON**
2. **Add New Webhook to Workspace**
3. チャネル: `#please-open-the-door` を選択 → **許可する**
4. 生成された Webhook URL をメモ
   例: `https://hooks.slack.com/services/XXX/XXX/XXX`

---

## 5. Bot Token を取得

1. 左メニュー **OAuth & Permissions**
2. **Bot Token Scopes** → **Add an OAuth Scope** → `chat:write` を追加
3. ページ上部 **Install to Workspace** → **許可する**
4. 表示された Bot Token をメモ
   例: `xoxb-...`

---

## 6. App Home を有効化

1. 左メニュー **App Home**
2. **Home Tab** → **ON**

---

## 7. Vercel に環境変数を登録

1. Vercel のプロジェクト → **Settings → Environment Variables**
2. 以下を追加:

| Name | Value |
|---|---|
| `BOT_TOKEN` | `xoxb-...`（Step 5 の Bot Token） |
| `WEBHOOK_URL` | `https://hooks.slack.com/...`（Step 4 の Webhook URL） |

3. **Deployments → 最新のデプロイ → Redeploy** で反映

---

## 8. Event Subscriptions を設定

1. 左メニュー **Event Subscriptions** → **ON**
2. **Request URL**: `https://あなたのURL.vercel.app/api/slack`
3. Verified と表示されることを確認
4. **Subscribe to bot events** → **Add Bot User Event** → `app_home_opened` を追加
5. **Save Changes**

---

## 9. Interactivity を設定

1. 左メニュー **Interactivity & Shortcuts** → **ON**
2. **Request URL**: `https://あなたのURL.vercel.app/api/slack`
3. **Save Changes**

---

## 10. 動作確認

1. Slack → 左メニュー **Apps** → `DoorBell` を検索して追加
2. **Home** タブを開く
3. 「🚪 ドア開けて！」ボタンをタップ
4. `#please-open-the-door` にメッセージが届けば完了

---

## 使い方（全員共通）

```
Slack → Apps → DoorBell → Home タブ
  ↓
「🚪 ドア開けて！」ボタンをタップ
  ↓
#please-open-the-door に自動投稿
```

初回のみ Apps から DoorBell を追加する操作が必要。
以降は同じ場所から常にアクセス可能。
