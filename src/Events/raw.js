const Event = require('../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: false
		});
	}

	run(data) {
		this.client.manager.updateVoiceState(data);
	}

};
