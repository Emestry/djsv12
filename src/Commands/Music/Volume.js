const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['vol'],
			description: 'Changes the volume of the bot.',
			category: 'Music',
			usage: '[volume]',
			guildOnly: true
		});
	}

	async run(message, args) {
		const player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription('Currently not playing anything.').setColor('BLACK'));

		if (!args.length) return message.channel.send(new MessageEmbed().setDescription(`The volume of the bot is \`${player.volume}\`.`).setColor('BLACK'));

		const { channel } = message.member.voice;

		if (!channel) return message.channel.send(new MessageEmbed().setDescription('You must be in a voice channel!').setColor('BLACK'));

		if (channel.id !== player.voiceChannel) return message.channel.send(new MessageEmbed().setDescription('You must be in the same voice channel as the bot!').setColor('BLACK'));

		const volume = Number(args[0]);

		if (!volume || volume < 1 || volume > 100) return message.channel.send(new MessageEmbed().setDescription('The volume can only be between 1 to 100.').setColor('BLACK'));

		player.setVolume(volume);
		return message.channel.send(new MessageEmbed().setDescription(`Set the volume to \`${volume}\`.`).setColor('BLACK'));
	}

};
