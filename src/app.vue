<script>
const Event = require('./lib/events')

import Patd from './lib/patd'

import PlayerInput from './components/player_input'
import Inventory from './components/inventory'
import Console from './components/console'

import SpecialThing from './items/special'

const gameData = require('./lib/data')

const patd = Patd.shared()

import { mapState, mapMutations } from 'vuex'

export default {
	name: 'App',
	components: {
		Console,
		Inventory,
		PlayerInput
	},

	data: () => {
		return {
			patd: patd,
		}
	},

	computed: {
		...mapState([
			'currentRoom'
		])
	},

	methods: {
		...mapMutations([
			'setCurrentRoom'
		])
	},

	mounted() {
		const store = this.$store

		this.patd.eventManager.on(Event.playerEnteredRoom, (room) => {
			this.setCurrentRoom(room)
		})

		this.patd.registerObject(new SpecialThing())
		this.patd.loadGame(gameData)
	},
}
</script>

<style lang="scss">
	@import "css/reset";

	body,html {
		font-family: 'Open Sans', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		color: rgba(255, 255, 255, 0.9);

		width: 100%;
		height: 100%;
	}

	.app {
		background-color: #484F60;
		display: flex;
		height: 100%;

		padding: 1em;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>

<template>
	<div class="app">
		<main>
			<Console />
			<Inventory />
			<PlayerInput />
		</main>
	</div>
</template>
