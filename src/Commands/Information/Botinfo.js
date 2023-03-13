const { MessageEmbed, version: djsversion } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const moment = require('moment');
const os = require('os');
const ms = require('ms');

const platforms = {
	win32: 'Windows',
	darwin: 'Darwin',
	freebsd: 'FreeBSD',
	aix: 'AIX',
	linux: 'Linux',
	openbsd: 'OpenBSD',
	sunos: 'SunOS',
	android: 'Android'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['info', 'bot'],
			description: 'Displays information about the bot.',
			category: 'Information'
		});
	}

	run(message) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(this.client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('General', [
				`**❯ Client:** ${this.client.user.tag} (${this.client.user.id})`,
				`**❯ Commands:** ${this.client.commands.size}`,
				`**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()} `,
				`**❯ Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
				`**❯ Time Created:** ${moment(this.client.user.createdTimestamp).format('LT, LL')}; ${moment(this.client.user.createdTimestamp).fromNow()}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ Version:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('System', [
				`**❯ Platform:** ${platforms[process.platform]}`,
				`**❯ Uptime:** ${ms(this.client.uptime, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		message.channel.send(embed);
	}

};
