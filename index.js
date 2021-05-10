const cluster = require('cluster')
require('dotenv').config()
const numCPUs = require('os').cpus().length
const { initApp } = require('./app')


let arrObj = []
process.argv.forEach( arg => {
  let arrArg = arg.split('=')
  arrObj.push({ clave: arrArg[0], valor: arrArg[1]})
})

let findModo = arrObj.find( item => item.clave.toLowerCase() == 'modo')
let modo = findModo ? findModo.valor : process.env.MODO

if(modo == 'cluster') {
  if(cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
  
    for(let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worder.process.pid} died`);
      cluster.fork()
    })
  } else {
    initApp()
    // http.createServer( (req, res) => {
    //   res.writeHead(200)
    //   res.end('Hello world\n')
    // }).listen(8000)
  
    console.log(`Worker ${process.pid} started`);
  }
} else {
  initApp()
}

