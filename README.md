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
| `.env.example` | 環境変数のテンプレート |

## 環境変数

| 変数名 | 内容 |
|---|---|
| `BOT_TOKEN` | Slack Bot Token（`xoxb-...`） |
| `WEBHOOK_URL` | Slack Incoming Webhook URL |

## デプロイ

詳細は [DEPLOY.md](./DEPLOY.md) を参照。
