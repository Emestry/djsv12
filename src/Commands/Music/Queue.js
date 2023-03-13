const { MessageEmbed } = require('discord.js');

const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Shows the entire music queue.',
			category: 'Music',
			guildOnly: true,
			usage: '[page]'
		});
	}

	async run(message, args) {
		const player = this.client.manager.players.get(message.guild.id);

		if (!player) return message.channel.send(new MessageEmbed().setDescription(`<:xmark:935907919050989628> | Currently not playing anything.`).setColor('BLACK'));

		const { queue } = player;
		const embed = new MessageEmbed()
			.setAuthor(`Queue for ${message.guild.name}`)
			.setColor('BLACK');
		const multiple = 10;
		const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

		const end = page * multiple;
		const start = end - multiple;

		const tracks = queue.slice(start, end);

		if (queue.current) embed.addField('Current', `[${queue.current.title}](${queue.current.url})`);

		if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`);
		else embed.setDescription(tracks.map((track, i) => `${start + ++i} - ${track.title}`).join('\n'));

		const maxPages = Math.ceil(queue.length / multiple);

		embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);
		if (maxPages > 1) {
			message.channel.send(`**Type \`queue 1-${maxPages}\` to check next pages.**`);
		}
		return message.channel.send(embed);
	}

};
