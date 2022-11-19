import todo from './event';
const rootSocket = (io: any) => {
    io.on('connection', (socket: any) => {
        console.log('==========================');
        console.log('New Connection Established');
        console.log('==========================');

        todo(socket);
    });
};

export default rootSocket;
