 var path=require("path");
 module.exports = {
     entry: './static/src/index.js',
     output: {
         path: path.resolve(__dirname , "static"),
         // path: __dirname,
         filename: 'bundle6.js',
         publicPath: '/static/'
         
     },
     module: {
         loaders: [

         {
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                plugins:['lodash'],
              presets: ['es2015','react']
             }
         },
         {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }]
     }
 };