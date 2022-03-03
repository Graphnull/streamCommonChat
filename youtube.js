const LiveChat = require('@freetube/youtube-chat').LiveChat;
let config = require('./package.json')
const liveChat = new LiveChat({channelId: config.youtubeChannelId})
let img ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAC4ElEQVRoge2YT0hUQRzHP/PyX1rmJgbSqhhBB7sVGFFRFIR06GKH6GTdN7p4ibAg6hKRREiUBWFFdYkIi7oESZkgXYQoqGjdg6fN1t6qqPvr4Jrre7P5dmffpvA+MPD4zcxvft/9zc6b94OAgICAgIBVjPI6UA5SyzRhoBFFE9AAbAZC6VaTbhXpKWsznqeAyYznn8B4usURYljESBEFoswxqt4TNxIgYLGXUwjHUbQClV7FFogkwgcUD3hLrwLRDdIKkBbK2Mgz4LCvIXpF8QKbo2qYGWeXpZ0Q4hIrJXgAoY1KLuq6XBmQ/VQwxxiwwffAciNBkno1TDLT6M7ALLtYecEDVLOOVqdRt4W2FCGY/Eix1WnSCWguQij54kmAWQauvobmFiMXWREvAhRho0V2HoLejxDphqoC/5Us94+ry8B644VKSqE9Ao++QvtpsPSndR7UOQ06z1WFWo3qWohcg5tDsH23uT+hThxHv24LFU7AAtt2wI0BuPAYNjWYeCqjjbJMg1uA+CAAQCk4cAz6PkHHeSgtz89PnCUT/d1COiqqoKML7o3MC8qVNX9vuEC2u1AxEIHpyeXHObGWXuhKNENs5u/1/jBlw8Mr0HcZZqZznS3Uk8g0uAUobMQHASLwqg96OiE+lq+X3+oJc5kGtwDBztd7Vj4PQ3cERt6ZevrlNGTbQoUhPgZ3uuD5bUilzP0J406TTsCE8UKzM/C0B3rPgZ1YfrxXlJcMCDHvn/oaBvvh+hkY/WLgJAvCD6dJl4FvRot0HjGavgyu2HTvge9+RmCIKzadALMM+IuHDJQwiOa4WgEkmGTIaXQJUG+YAm4VJaRcUPQ4KxKQ7S4U5yzw0u+YcqAfm3O6jn+VFhX7OEmKE/+ttAiDCPcZ4G5OpUUdsocQFmFSNKEIowgjNKKoIUUNEEJRzeInaTmLopPAws1tIt0yC7yjCDEgiiLKLDGvxd2AgICAgIBVzR8UibLdyBYx4AAAAABJRU5ErkJggg=='
liveChat.on('start', (liveId) => {
    console.log('yotube started')
})

module.exports =(emmiter)=>{

liveChat.on('comment', (comment) => {
    let msg = comment.message && comment.message[0] && comment.message[0].text;
    let user = comment.author && comment.author.name;
    
    msg && user && emmiter.emit('data',img,  user, msg)
})
}
// Emit at end of observation chat.
// reason: string?
liveChat.on('end', (reason) => {
    console.error('ERROR end', reason)
})

// Emit at receive chat.
// comment: CommentItem


// Emit when an error occurs
// err: Error
liveChat.on('error', (err) => {
    console.error('ERROR', err)
})

liveChat.start()
//setInterval(()=>{},1000)