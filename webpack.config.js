const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключили плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/scripts/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    compress: true,
    port: 8080,
  },
  module: {
    rules: [ // rules — это массив правил
      { // добавим в него объект правил для бабеля
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: "babel-loader", // при обработке этих файлов нужно использовать babel-loader
        exclude: "/node_modules/",  // исключает папку node_modules, файлы в ней обрабатывать не нужно
      }, // добавили правило для обработки файлов
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource", 
      },  // регулярное выражение, которое ищет все файлы с такими расширениями
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ], //Добавление массива
};
