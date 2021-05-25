const io=require('socket.io')(5000,
    {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })
io.on('connection',socket=>{
    const id=socket.handshake.query.id;
    socket.join(id);

    socket.on('send-message', ({
                recipents,
                text
            }) => {
        recipents.forEach(element => {
            console.log(recipents,"from server");
            const newrecipients=recipents.filter(r=>r!==element)
            newrecipients.push(id);
            console.log(newrecipients,'from server');
            socket.broadcast.to(element).emit('recieve-message',{
                reciepients: [...newrecipients], sender: id, text
            })
        });
    })
})
 