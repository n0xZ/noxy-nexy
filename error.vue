<script setup lang="ts">
	import { NuxtError } from '#app'
	type ErrorProps = {
		error: NuxtError
	}
	useHead({ title: 'Noxy - Error' })
	const props = defineProps<ErrorProps>()
</script>

<template>
	<div>
		<p>Ocurrió un error. {{ props.error.message }}</p>
	</div>
</template>
