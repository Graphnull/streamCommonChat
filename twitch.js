let { RefreshingAuthProvider, StaticAuthProvider  } = require('@twurple/auth');
let { ChatClient } = require('@twurple/chat');
let fs = require('fs').promises;

let img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACUklEQVRoge2YzWsTQRjGn1kb8T9Ij+qt/0EFN6lHLz14EaH147IXL9KbIrK4hYIfBaVepAdBqlkiLaW9WHsQURSNCBUxGEKJBW1r1SS2mybpznhoK7HN7ky2me4e5nccnnfe95l5d4YdQKFQKBR7gIiIDCMT6yw5WQBHJdfjyXU70bRWTSQ4XnLOIcTi/eAaMIxMjACX96OYIHTwBDtX/+rDbqkFNTLY/4ar8d2BrdW/0raKJOBroLPonAdwZJ9qCYSnAcPIxECi2/vbeBqIlysXEPHVB3wMEMYiv/qA/yl0OOikjaeH16klohFB6CKLMspA2CgDYaMMhI0yEDbc/4EgiNysPM3ygiOUK5I78Od3Halb2cahVS9t5AxUKy4e3/yM8q/a9pALoM9LL6WFguJuMDy58+W/9mHAJctOTHrFRGYHGAOmR/OY/1T6N0aAG5adGPGLi4yB2UcFfHy10jiUJl0695+k5RbivRQ0O10oZZgdK+DtzKJYEoKX2iH3rGkSypNK/wZqVRcT93LIfSiKhuTrLk4NPTixLiKWamC1WIc9nMX3+TXRkBV6gJ0cspM/RAOkGVhecJC6nUX5Z40v3qTCKO0dtHtyreSRYiA/V8T4SA7ViisaQjWwPjPd87rVXG038G5mEc/GCqCUtRDFBkw7OR4kn9Dzuh/XTr/gVeoyQgaslH53r7maIfsUWgMjZyxbn5KVQKaBb4ySXiutv5eYQ9pNPKdR7Zjs4gE5Bp5qHQd1M338q4S5d9HWFiJg98kSvWg+795o57wKhcKbv0/rv1TU210mAAAAAElFTkSuQmCC'
async function main(emmiter) {
    let clientData = JSON.parse(await fs.readFile('./../access.json', 'UTF-8'));
	const clientId = clientData.clientId;
	const clientSecret = clientData.clientSecret;
	const accessToken = clientData.accessToken;
    const authProvider = new StaticAuthProvider(clientId, accessToken);
	const tokenData = JSON.parse(await fs.readFile('./../tokens.json', 'UTF-8'));
	const authProvider1 = new RefreshingAuthProvider(
		{
			clientId,
			clientSecret,
			onRefresh: async newTokenData => await fs.writeFile('./../tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
		},
		tokenData
	);
	const chatClient = new ChatClient({ authProvider, channels: ['grnlstream'] });
	await chatClient.connect();
    console.log(4444444)
	chatClient.onMessage((channel, user, message) => {
        console.log(channel, user, message)
		emmiter.emit('data',img, user, message )
		if (message === '!ping') {
			chatClient.say(channel, 'Pong!');
		} else if (message === '!dice') {
			const diceRoll = Math.floor(Math.random() * 6) + 1;
			chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
		}
	});
    /*
	chatClient.onSub((channel, user) => {
		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
	});
	chatClient.onResub((channel, user, subInfo) => {
		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
	});
	chatClient.onSubGift((channel, user, subInfo) => {
		chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
	});*/
}

module.exports =main;