const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

const filePath = {
  js: "./src/ts/",
  sass: "./src/scss/",
};

/** Sassファイル読み込みの定義 */
const entriesScss = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, `${filePath.sass}**/**.scss`)],
  {
    ignore: path.resolve(__dirname, `${filePath.sass}**/_*.scss`),
  }
)();

const cssGlobPlugins = (entriesScss) => {
  return Object.keys(entriesScss).map((key) => {
    return new MiniCssExtractPlugin({
      // 出力するファイル名
      filename: `./css/${key}.css`,
    });
  });
};

/** TypeScript読み込みの定義 */
const entriesTs = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, `${filePath.js}*.ts`),
])();

module.exports = () => ({
  entry: entriesTs,

  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].js",
  },

  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src/"), // ~でエイリアスを指定したらエラーでたので@に変更
      "@font": path.resolve(__dirname, "assets/fonts/"),
      "@image": path.resolve(__dirname, "assets/images/"),
      "@style": path.resolve(__dirname, "src/scss/"),
    },
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // CSSを別ファイルに出力する設定
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: true, //ソースマップツールを有効
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [[require("autoprefixer")({ grid: true })]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, //ソースマップツールを有効
            },
          },
        ],
      },
      {
        test: /\.png|\.jpg|\.jpeg|\.webp/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name][contenthash][ext]",
        },
      },
      {
        test: /\.ttf|\.woff/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][contenthash][ext]",
        },
      },
    ],
  },

  plugins: [...cssGlobPlugins(entriesScss)],

  watchOptions: {
    ignored: /node_modules/,
  },
});
