const Command = require('../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hallo']
		});
	}

	async run(message) {
		message.channel.send('Hello!');
	}

};
