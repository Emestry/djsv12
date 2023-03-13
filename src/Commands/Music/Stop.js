const { MessageEmbed } = require('discord.js');

const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['disconnect', 'leave', 'dc', 'getnahhui'],
			description: 'Destroys the player and leaves the channel.',
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

		player.destroy();

		return message.channel.send(new MessageEmbed().setDescription(`Leaving the voice channel.`).setColor('BLACK'));
	}

};
