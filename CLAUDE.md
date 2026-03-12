# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

オフィスのドアを開けてもらうための通知アプリ。2つのインターフェースを持つ：

1. **Slack App Home** — Slack の App Home タブにボタンを表示し、押すと `#please-open-the-door` に通知
2. **PWA** — ホーム画面に追加できる Web アプリ。同チャネルに通知を送る

## デプロイ

- ホスティング: **Vercel**（GitHub push で自動デプロイ）
- `api/` 以下のファイルが Vercel サーバーレス関数として動作する

```bash
git push  # これだけで本番に反映される
```

## アーキテクチャ

```
public/          # PWA フロントエンド（静的ファイル）
  index.html     # 名前入力画面 + ドアボタン（localStorage で名前を保持）
  manifest.json  # PWA インストール設定
  sw.js          # Service Worker（最小構成、キャッシュなし）
  icon.svg       # アイコン

api/             # Vercel サーバーレス関数
  notify.js      # PWA からのリクエストを受け取り Webhook に POST
  slack.js       # Slack Events API / Interactivity の統合エンドポイント
```

### `api/slack.js` のリクエスト振り分け

| Content-Type | 処理 |
|---|---|
| `application/json` | `url_verification`（初回検証）または `app_home_opened` イベント |
| `application/x-www-form-urlencoded` | ボタン押下（`block_actions`） |

## 環境変数（Vercel に設定）

| 変数名 | 内容 |
|---|---|
| `BOT_TOKEN` | Slack Bot Token（`xoxb-...`） |
| `WEBHOOK_URL` | Slack Incoming Webhook URL |
