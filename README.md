# DoorBell

オフィスのドアを開けてもらうための通知アプリ。

Slack の App Home からボタンを押すだけで、
`#please-open-the-door` チャネルに通知が届きます。

## 機能

- Slack App Home に「🚪 ドア開けて！」ボタンを表示
- ボタンを押したユーザー名を含めてチャネルに通知

## 構成

| ファイル | 役割 |
|---|---|
| `api/slack.js` | Slack イベント・ボタン操作の処理（Vercel） |
| `package.json` | Node.js プロジェクト設定 |
| `.env.example` | 環境変数のテンプレート(※未使用) |

## 環境変数

| 変数名 | 内容 |
|---|---|
| `BOT_TOKEN` | Slack Bot Token（`xoxb-...`） |
| `WEBHOOK_URL` | Slack Incoming Webhook URL |

## 動作の仕組み

### 全体の流れ

```
ユーザーが Slack App Home を開く
        ↓
Slack → Vercel (api/slack.js) に app_home_opened イベントを送信
        ↓
サーバーが Home タブにボタンを描画
        ↓
ユーザーが「🚪 ドア開けて！」を押す
        ↓
Slack → Vercel にボタン押下イベントを送信
        ↓
サーバーが Incoming Webhook で #please-open-the-door に投稿
```

### コードの詳細（`api/slack.js`）

**1. App Home を開いたとき（`app_home_opened`）**
- Slack が JSON で `app_home_opened` イベントを送ってくる
- `publishHome()` を呼び出し、`views.publish` API でボタン付きの Home 画面を描画する

**2. ボタンを押したとき（`block_actions`）**
- Slack が `application/x-www-form-urlencoded` でペイロードを送ってくる
- `action_id: "open_door"` を確認し、押したユーザー名を取得
- Incoming Webhook に POST して `#please-open-the-door` にメッセージを投稿する

**3. URL 検証（初回設定時）**
- Slack が `url_verification` を送ってきたとき、`challenge` をそのまま返して認証を通す

### 使われている Slack の仕組み

| 仕組み | 用途 |
|---|---|
| Events API | App Home を開いたことを検知 |
| views.publish | Home タブにボタンを描画 |
| Block Kit (button) | ボタン UI の定義 |
| Interactivity | ボタン押下を受信 |
| Incoming Webhook | チャネルへのメッセージ投稿 |

## デプロイ

詳細は [DEPLOY.md](./DEPLOY.md) を参照。
