const { MessageEmbed } = require('discord.js');

const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['np'],
			description: 'Shows the currently playing song.',
			category: 'Music',
			guildOnly: true
		});
	}

	async run(message) {
		const player = message.client.manager.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription(`Currently not playing anything.`).setColor('BLACK'));

		return message.channel.send(new MessageEmbed().setDescription(`Currently Playing: **${player.queue.current.title}**`).setColor('BLACK'));
	}

};
