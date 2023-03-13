const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Show the Lavalink node stats.',
			category: 'Music',
			ownerOnly: true,
			guildOnly: true
		});
	}

	async run(message) {
		const nodes = [...message.client.manager.nodes.values()];

		message.channel.send(new MessageEmbed()
			.setColor('BLACK')
			.setAuthor('Lavalink Node(s) Stats', message.client.user.displayAvatarURL())
			.setDescription(
				nodes.map(node => {
					const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
					const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
					const { uptime } = node.stats;
					return `\`\`\`asciidoc
					Status    :: ${node.connected ? 'Connected' : 'Disconnected'} ${node.connected ? `
					CPU Load  :: ${cpuLoad}%
					Mem Usage :: ${memUsage} MB
					Uptime    :: ${ms(uptime, { long: true })}
					Players   :: ${node.stats.playingPlayers} of ${node.stats.players} playing` : ''}\`\`\``;
				})
			)
			.setTimestamp()
		);
	}

};
