const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        !withModules
            ? 'css-loader'
            : {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
                        esModule: false,
                    },
                },
            },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        'sass-loader',
    ];
};

module.exports = {
    entry: path.resolve(__dirname, './package.json'), 
    target: !isProd ? 'web' : 'browserslist',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'index.tsx'),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        isProd && new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new TsCheckerPlugin ()
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true),
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles(),
            },
            {
                test: /\.css/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            store: path.join(srcPath, 'store'),
            assets: path.join(srcPath, 'assets'),
            hooks: path.join(srcPath, 'hooks'),
            types: path.join(srcPath, 'types'),
        }
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        historyApiFallback: true
    }
}