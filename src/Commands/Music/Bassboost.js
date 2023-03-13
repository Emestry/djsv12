const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

const levels = {
	none: 0.0,
	low: 0.10,
	medium: 0.20,
	high: 0.30,
	troll: 100.0
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['bb'],
			description: 'Bass boosts the currently playing song.',
			category: 'Music',
			usage: '[ none | low | medium | high | troll ]',
			args: true,
			guildOnly: true
		});
	}

	async run(message, args) {
		const player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription(`There is nothing playing.`).setColor('BLACK'));

		const { channel } = message.member.voice;

		if (!channel) return message.channel.send(new MessageEmbed().setDescription(`You must be in a voice channel.`).setColor('BLACK'));

		if (channel.id !== player.voiceChannel) {
			return message.channel.send(new MessageEmbed().setDescription(`You must be in the same voice channel as the bot.`).setColor('BLACK'));
		}

		let level = 'none';
		if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

		const bands = new Array(3)
			.fill(null)
			// eslint-disable-next-line id-length
			.map((_, i) =>
				({ band: i, gain: levels[level] })
			);

		player.setEQ(...bands);

		return message.channel.send(new MessageEmbed().setDescription(`Set the bass boost level to: **${level}**.`).setColor('BLACK'));
	}

};
