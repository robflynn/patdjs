<script>
const Event = require('./lib/events')

import Patd from './lib/patd'

import Scene from './components/scene'
import PlayerInput from './components/player_input'
import Console from './components/console'

const gameData = require('./lib/data')

const patd = Patd.shared()

import { mapState, mapMutations } from 'vuex'

export default {
	name: 'App',
	components: {
		Scene,
		Console,
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
			console.log("watty botty ", room)
			this.setCurrentRoom(room)
		})

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

		padding: 2em;
	}

	main {
		display: flex;
		flex-direction: column;
	}
</style>

<template>
	<div class="app">
		<main>
			<Scene />
			<Console />
			<PlayerInput />
		</main>
	</div>
</template>
