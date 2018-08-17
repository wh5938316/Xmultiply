const express = require('express')
const proxy = require('http-proxy-middleware')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  // server.use(express.static('public'))
  server.use('/static', express.static('public'))

  // server.use('/static', express.static(path.join(__dirname, 'public')))

  server.get('/product/:id', (req, res) => {
    const actualPage = '/ProductDetail'
    const queryParams = { 
        product: req.params.id 
    } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/model/:id', (req, res) => {
    const actualPage = '/ModelDetail'
    const queryParams = { 
        id: req.params.id 
    } 
    app.render(req, res, actualPage, queryParams)
  })
  
  // server.get('v1/product/:id', (req, res) => {
  //   // const actualPage = '/ProductDetail'
  //   // const queryParams = { 
  //   //     product: req.params.id 
  //   // } 
  //   // app.render(req, res, actualPage, queryParams)
  //   return {'fuck': 1};
  // })


  server.get('/list', (req, res) => {
    const actualPage = '/ViewProduct'
    // const queryParams = { 
    //     page: 1 
    // } 
    // app.render(req, res, actualPage, queryParams)
    app.render(req, res, actualPage)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

//   let options = {
//     target: 'http://www.example.org', // target host
//     changeOrigin: true,               // needed for virtual hosted sites
//     ws: true,                         // proxy websockets
//     pathRewrite: {
//         '^/api/old-path' : '/api/new-path',     // rewrite path
//         '^/api/remove/path' : '/path'           // remove base path
//     },
//     router: {
//         // when request.headers.host == 'dev.localhost:3000',
//         // override target 'http://www.example.org' to 'http://localhost:8000'
//         'dev.localhost:3000' : 'http://localhost:8000'
//     }
// };

  // server.use('/upload', proxy({
  //   // 代理跨域目标接口
  //   target: 'http://127.0.0.1:3000',
  //   changeOrigin: true,

  //   // 修改响应头信息，实现跨域并允许带cookie
  //   onProxyRes: function(proxyRes, req, res) {
  //       res.header('Access-Control-Allow-Origin', '*')
  //       res.header('Access-Control-Allow-Credentials', 'true')
  //   },

  //   // 修改响应信息中的cookie域名
  //   // cookieDomainRewrite: 'http://127.0.0.1'  // 可以为false，表示不修改
  // }));

  server.middleware = [
    proxy(['/upload'], {target: 'http://localhost:3000', changeOrigin: true}),
  ];
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

  // server.all('*', function(req, res, next) {  
  //   res.header("Access-Control-Allow-Origin", "*");  
  //   res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  //   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  //   res.header("X-Powered-By",' 3.2.1')  
  //   res.header("Content-Type", "application/json;charset=utf-8");  
  //   next();  
  // });
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
