import server from '../server';
import rootSocket from '../socket/index';
import connectDB from '../config/database';
import { Server } from 'socket.io';
const io = new Server(server);
import ora from 'ora';

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'server loading';
}, 1000);

try {
    connectDB().then((a) => {
        const { name, host, port } = a.connections[0];
        setTimeout(() => {
            spinner.stop();
        }, 5000);

        console.log('[Database]: mongodb connected');
        console.log('[Database Name]:', name);
        console.log('[Host]:', host);
        console.log('[Port]:', port);
        rootSocket(io);
        server.listen(process.env.PORT, () => {
            console.log(`[App]: running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`);
        });
    });
} catch (e) {
    console.log('[Server Failed]:', e);
    process.exit(1);
}

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        crimson: '\x1b[38m', // Scarlet
    },
    bg: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        crimson: '\x1b[48m',
    },
};
const exLog = console.log;
const d: string = new Date().toLocaleTimeString();
console.log = function (...arg) {
    const timestamp = `${colors.dim}[${d}]${colors.reset} `;
    Array.prototype.unshift.call(arg, timestamp);
    exLog.apply(this, [...arg]);
};
