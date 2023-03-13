const { MessageEmbed } = require('discord.js');

const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Resumes the currently playing song.',
			category: 'Music',
			guildOnly: true
		});
	}

	async run(message) {
		const player = this.client.manager.players.get(message.guild.id);
		if (!player) return message.channel.send(new MessageEmbed().setDescription(`Currently not playing anything.`).setColor('BLACK'));

		const { channel } = message.member.voice;

		if (!channel) return message.channel.send(new MessageEmbed().setDescription(`You must be in a voice channel.`).setColor('BLACK'));

		if (channel.id !== player.voiceChannel) {
			return message.channel.send(new MessageEmbed()
				.setDescription(`You must be in the same voice channel as the bot.`).setColor('BLACK'));
		}

		if (!player.paused) return message.channel.send(new MessageEmbed().setDescription(`The song is not paused.`).setColor('BLACK'));

		player.pause(false);
		return message.channel.send(new MessageEmbed().setDescription(`Resumed the song.`).setColor('BLACK'));
	}

};
