module.exports = (client) => {
	const { Manager } = require('erela.js');

	client.manager = new Manager({
		nodes: [
			{
				host: 'localhost',
				port: 2333,
				password: 'youshallnotpass'
			}
		],
		send(id, payload) {
			const guild = client.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		}
	})
		.on('nodeConnect', node => console.log(`Node ${node.options.identifier} connected`))
		.on('nodeError', (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
		.on('trackStart', (player, track) => {
			client.channels.cache
				.get(player.textChannel)
				.send(`Now playing: ${track.title}`);
		})
		.on('queueEnd', (player) => {
			client.channels.cache
				.get(player.textChannel)
				.send('Queue has ended.');

			player.destroy();
		});
};
