# Typing Game (for GitHub Pages)

静的サイト（HTML/CSS/JS）だけで動くタイピングゲームの最小構成です。

## ローカルで試す
`index.html` をブラウザで開くだけ。

## GitHub Pages で公開
1. GitHub で新規リポジトリを作成（例: `typing-game`）。
2. このフォルダ内のファイルをそのままアップロード（または git push）。
3. リポジトリの **Settings → Pages** で、**Deploy from a branch** を選択し、
   **Branch: `main` / Folder: `/root`** を指定して保存。
4. 数分後、`https://<username>.github.io/typing-game/` で公開されます。

**注意**: 画像や音声は `./assets/` のような相対パスで参照してください（`/` から始めると 404 になります）。
