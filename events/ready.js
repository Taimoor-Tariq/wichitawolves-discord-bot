module.exports = (client) => {
	var cache_messages = [
		["649150426159251477", "649155799595352074"],
		["821192367779610705", "821193620244660285"]
	];

	let n = 0;
	let prom = cache_messages.map(async m => {
		await client.channels.cache.get(m[0]).messages.fetch(m[1]);
		n++;
	})

	Promise.all(prom).then(() => {
		console.log(`Cached ${n} Messages`);
		console.log(`Logged in as ${client.user.tag}!`);


	});
};