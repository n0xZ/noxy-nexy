<script setup lang="ts">
	useHead({ title: 'Bienvenid@ a Nexy!' })
</script>
<template>
	<header class="p-5">
		<nav
			class="flex flex-row items-center justify-between container mx-auto max-w-xl font-inter"
		>
			<h1><NuxtLink to="/">Nexy</NuxtLink></h1>
			<ul class="flex flex-row items-center space-x-4">
				<li><NuxtLink to="/login">Iniciar sesión</NuxtLink></li>
				<li><NuxtLink to="/register">Unete ya!</NuxtLink></li>
			</ul>
		</nav>
	</header>
	<main
		class="min-h-screen h-full flex flex-col justify-center items-center space-y-6 font-roboto"
	>
		<h2 class="text-center text-5xl">
			Gestionar proyectos <span class="c-fuchsia-400">nunca fue tan facil.</span>
		</h2>

		<NuxtLink to="/login" class="px-4 py-3 rounded-md bg-fuchsia-500 c-neutral-50"
			>Comenzar ya</NuxtLink
		>
	</main>
</template>
