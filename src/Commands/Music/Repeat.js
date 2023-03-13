const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['loop'],
			description: 'Repeats the currently playing song.',
			category: 'Music',
			guildOnly: true
		});
	}

	async run(message, args) {
		const player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription(`Currently not playing anything.`).setColor('BLACK'));

		const { channel } = message.member.voice;

		if (!channel) return message.channel.send(new MessageEmbed().setDescription(`You must be in a voice channel.`).setColor('BLACK'));

		if (channel.id !== player.voiceChannel) {
			return message.channel.sends(new MessageEmbed()
				.setDescription(`You must be in the same voice channel as the bot.`).setColor('BLACK'));
		}

		if (args.length && /queue/i.test(args[0])) {
			player.setQueueRepeat(!player.queueRepeat);
			const queueRepeat = player.queueRepeat ? 'Enabled' : 'Disabled';
			// eslint-disable-next-line id-length
			return message.channel.send(new MessageEmbed().setDescription(`${queueRepeat} queue repeat.`).setColor('BLACK'));
		}

		player.setTrackRepeat(!player.trackRepeat);
		const trackRepeat = player.trackRepeat ? 'Enabled' : 'Disabled';
		// eslint-disable-next-line id-length
		return message.channel.send(new MessageEmbed().setDescription(`${trackRepeat} track repeat.`).setColor('BLACK'));
	}

};
