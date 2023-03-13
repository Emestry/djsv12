const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Shuffles the entire music queue.',
			category: 'Music',
			guildOnly: true
		});
	}

	async run(message) {
		const voiceChannel = message.member.voice.channel;

		const player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription(`Currently not playing anything.`).setColor('BLACK'));

		if (!voiceChannel) return message.channel.send(new MessageEmbed().setDescription(`You must be in a voice channel.`).setColor('BLACK'));

		if (voiceChannel.id !== player.voiceChannel) {
			return message.channel.send(new MessageEmbed()
				.setDescription(`You must be in the same voice channel as the bot.`).setColor('BLACK'));
		}

		player.queue.shuffle(!player.queue.shuffle);
		const queueShuffle = player.queue.shuffle ? 'Enabled' : 'Disabled';
		return message.channel.send(new MessageEmbed().setDescription(`${queueShuffle} queue shuffle.`).setColor('BLACK'));
	}

};
