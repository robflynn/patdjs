<script>
import Patd from './lib/patd'

import Scene from './components/scene'
import PlayerInput from './components/player_input'
import Console from './components/console'

export default {
	name: 'App',
	components: {
		Scene,
		Console,
		PlayerInput
	},
	mounted() {
		console.log("booted")
	}
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
