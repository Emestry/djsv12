const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['p']
		});
	}

	async run(message, args) {
		if (!message.member.voice.channel) return message.channel.send('music/play:NOT_VC');

		if (this.client.manager?.players.get(message.guild.id)) {
			if (message.member.voice.channel.id !== this.client.manager?.players.get(message.guild.id).voiceChannel) return message.channel.send('misc:NOT_VOICE');
		}


		let player;
		try {
			player = this.client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
				selfDeafen: true,
				volume: 50
			});
		} catch (err) {
			if (message.deletable) message.delete();
			this.client.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			return message.channel.send('misc:ERROR_MESSAGE', { ERROR: err.message });
		}

		if (args.length === 0) {
			const fileTypes = ['mp3', 'mp4', 'wav', 'm4a', 'webm', 'aac', 'ogg'];
			if (message.attachments.size > 0) {
				const { url } = message.attachments.first();
				for (const type of fileTypes) {
					if (url.endsWith(type)) args.push(url);
				}
				if (!args[0]) return message.channel.send('music/play:INVALID_FILE');
			} else {
				return message.channel.send('music/play:NO_INPUT');
			}
		}

		let res;
		const search = args.join(' ');

		try {
			res = await player.search(search, message.author);
			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();
				throw res.exception;
			}
		} catch (err) {
			return message.channel.send('music/play:ERROR', { ERROR: err.message });
		}
		if (res.loadType === 'NO_MATCHES') {
			if (!player.queue.current) player.destroy();
			return message.channel.send('music/play:NO_SONG');
		} else if (res.loadType === 'PLAYLIST_LOADED') {
			if (player.state !== 'CONNECTED') player.connect();

			// Show how many songs have been added
			const embed = new MessageEmbed(this.client, message.guild)
				.setColor(message.member.displayHexColor)
				.setDescription('music/play:QUEUED', { NUM: res.tracks.length });
			message.channel.send(embed);

			// Add songs to queue and then pLay the song(s) if not already
			player.queue.add(res.tracks);
			if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
		} else {
			// add track to queue and play
			if (player.state !== 'CONNECTED') player.connect();
			player.queue.add(res.tracks[0]);
			if (!player.playing && !player.paused && !player.queue.size) {
				player.play();
			} else {
				const embed2 = new MessageEmbed(this, message.guild)
					.setColor(message.member.displayHexColor)
					.setDescription('music/play:SONG_ADD', { TITLE: res.tracks[0].title, URL: res.tracks[0].uri });
				message.channel.send(embed2);
			}
		}
	}

};
