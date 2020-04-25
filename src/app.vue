<script>
const Event = require('./lib/events')

import Patd from './lib/patd'

import Scene from './components/scene'
import PlayerInput from './components/player_input'
import Console from './components/console'

const patd = Patd.shared()

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
			scene: patd.currentRoom
		}
	},

	mounted() {
		console.log("booted")

		this.patd.eventManager.on(Event.playerEnteredRoom, (room) => {
			this.scene = room
		})
	}
}
</script>

<style lang="scss">
</style>

<template>
	<div>
		<Scene :scene="scene"/>
		<Console />
		<PlayerInput />
	</div>
</template>
