# JS-Task-Tutorial-PJ

Zenn の本「JavaScript入門 - タスク管理アプリを作ってみよう!」の答え合わせ用ソースコードです。

フレームワークを使わない Vanilla JavaScript で、タスク管理アプリ（追加・完了切り替え・削除・絞り込み・localStorage への保存）を4つのフェーズに分けて作ります。

## ブランチ

| ブランチ | 内容 |
|---|---|
| `main` | 完成版 |
| `Chapter03/タスクの追加と一覧描画` | 入門03（Phase 1）を終えた時点のコード |
| `Chapter04/完了切り替えと削除` | 入門04（Phase 2）を終えた時点のコード |
| `Chapter05/フィルタリングと件数表示` | 入門05（Phase 3）を終えた時点のコード |
| `Chapter06/localStorageで永続化する` | 入門06（Phase 4）を終えた時点のコード（完成版と同じ） |

## 動かし方

ブラウザだけで動作します。インストールは不要です。

1. このリポジトリを取得します（「Code」→「Download ZIP」でも構いません）
2. VS Code でフォルダを開き、`index.html` を右クリック →「Open with Live Server」で起動します
   - Live Server を使わない場合は、`index.html` をブラウザで直接開いても動作します

## 構成

```
index.html   # フォーム・フィルタータブ・タスク一覧・フッター
style.css    # スタイル
script.js    # タスクの操作・画面の描画・localStorage への保存
```

## 技術スタック

- HTML5 / CSS3 / JavaScript（ES6+）
- データ保存: localStorage
- 外部ライブラリ・ビルドツール不使用
- 動作確認ブラウザ: Chrome 最新版
