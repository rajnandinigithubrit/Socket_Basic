// const express = require('express');
// const sql = require('mssql');

// const app = express();
// const PORT = 8080;

// // Connection configuration
// const config = {
//   user: 'sa',
//  password: 'cmots@2010',
//   server: 'win2k8',
//   database: 'JMamcDB',
// //   options: {
// //     encrypt: true, // If you're on Azure, set to true
// //     trustServerCertificate: true, // If you're on Windows, set to true
// //   },
// };

// // Create a connection pool
// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect();

// poolConnect
//   .then(() => {
//     console.log('Connected to MSSQL database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MSSQL database:', err);
//   });

// // Express route to perform a sample query
// app.get('/query', async (req, res) => {
//   try {
//     const request = pool.request();
//     const result = await request.query('SELECT * FROM LoginD');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Close the connection pool on application exit
// process.on('SIGTERM', async () => {
//   await pool.close();
//   console.log('Connection pool closed');
//   process.exit(0);
// });

// process.on('SIGINT', () => {
//   process.emit('SIGTERM');
// });

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const http = require('http')
const express = require("express")
const app = express();
const path = require('path')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

io.on("connection",(socket)=>{
  socket.on('user-message',(message) =>{
    console.warn("A new user message",message)
    io.emit("message",message)
  });
})

app.use(express.static(path.resolve('./public')))
app.get('/',(req,res)=>{
  res.sendFile("/public/index.html")
})

server.listen(8080,()=> console.log("app is running on port:8080"))