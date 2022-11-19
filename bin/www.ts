import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import server from '../server';
import rootSocket from '../socket/index';
import connectDB from '../config/database';
import { Server } from 'socket.io';
const io = new Server(server);

connectDB()
    .then((a) => {
        const { name, host, port } = a.connections[0];
        console.log('[Database]: mongodb connected');
        console.log('[Database Name]:', name);
        console.log('[Host]:', host);
        console.log('[Port]:', port);

        rootSocket(io);
        server.listen(process.env.PORT, () => {
            console.log(`[App]: running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`);
        });
    })
    .catch((e) => {
        console.log('[Server Failed]:', e);
        process.exit(1);
    });

var exLog = console.log;
const d: string = new Date().toLocaleTimeString()
console.log = function (msg) {
    var timestamp = `[${d}]  `;
    Array.prototype.unshift.call(arguments, timestamp);
    exLog.apply(this, [...arguments]);
};
