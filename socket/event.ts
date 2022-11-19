const todo = (socket: any) => {
    socket.on('add', (data: any) => {
        console.log('added', data);
    });
};

export default todo;
