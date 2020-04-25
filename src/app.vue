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
</style>

<template>
	<div>
		<Scene />
		<Console />
		<PlayerInput />
	</div>
</template>
