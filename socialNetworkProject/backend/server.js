import app from './src/app.js';
import { connectDB } from './src/db/db.js';
import {createServer} from 'http';
import setupSocket from './src/sockets/socket.js';

let httpServer = createServer(app)
setupSocket(httpServer); 
//we can't just pass app to setupSocket because app is not http server(it is very abstract of creating a server. therefore we have to create a server from scratch), so we have to create http server using createServer method of http module and then pass that http server to setupSocket function.


connectDB();

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
}   );