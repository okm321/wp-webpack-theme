# Wordpress Theme With Webpack

Wordpress のカスタムテーマ開発を webpack を用いて、ホットリロードや、ts・scss のコンパイルを自動で行うことができます。

## Version

バージョンは以下ですが、適宜変えてください

- Nodejs -> 18.18.0
- webpack -> 5.88.2
- volta -> 1.1.1

## git の管理を取り除く

このレポジトリを clone した後、以下のコマンドで git の管理を取り除く

```zsh
rm -rf .git
```

## Set Up

### 事前準備

#### volta のインストール

このプロジェクトは[volta](https://volta.sh/)を使って node のバージョンを管理しているので、volta を入れてなければインストールしてください

```zsh
curl https://get.volta.sh | bash
```

volta は`package.json`に記述されているバージョンを自動でダウンロードしてくれるので、該当の node をコマンドでインストールする必要はありません

```json:package.json
// package.json

{
  "volta": {
    "node": "18.18.0"
  }
}
```

#### wordpress をローカルで起動

wordpress をローカルで起動しておいてください。起動している URL を`webpack.dev.js`ファイルの 17 行目の target に記述してください。（デフォルトの設定は[http://localohost:8000](http://localohost:8000)）

```js:webpack.dev.js
module.exports = merge(common(), {
  ...

  plugins: [
    new BrowserSyncPlugin({
      ...
      // ホストをつないでいるポートをproxyで指定
      proxy: {
        target: "http://localhost:8000", // ← 必要な場合はここを変更する
      },
    }),
  ]
})
```

### パッケージのインストール

パッケージマネージャーは[bun](https://bun.sh/package-manager)や[yarn](https://yarnpkg.com/)などのお好きなものを使ってください。ここでは bun と yarn の例を記述します

```zsh
bun install

or

yarn install
```

### webpack の起動

webpack の dev モードを使うことで php と scss の変更を検知し、コンパイルとホットリロードを行います

```zsh
bun dev

or

yarn dev
```

このコマンドを実行すると、[http://localhost:3000](http://localhost:3000)にジャンプするとホットリロードに対応したページを見ることができます。これでセットアップは完了です

## SCSS と Typescript

scss と typescript は`src`ディレクトリに記述していきます。webpack でコンパイルされたら`dist`ディレクトリにコンパイル後の css と js が吐き出されます。
