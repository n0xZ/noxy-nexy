<script setup lang="ts">
	const user = useSupabaseUser()
	const client = useSupabaseAuthClient()

	const signOut = async () => {
		await client.auth.signOut()
	}
</script>

<template>
	<div class="h-full w-full">
		<header class="p-5">
			<nav
				class="flex flex-row items-center justify-between container mx-auto max-w-xl"
			>
				<h1><NuxtLink to="/home">Nexy</NuxtLink></h1>
				<ul class="flex flex-row items-center space-x-5">
					<li><NuxtLink to="/"></NuxtLink></li>
					<li><NuxtLink to="/"></NuxtLink></li>
				</ul>
				<MobileMenu :user="user" :sign-out="signOut" />
			</nav>
		</header>
		<main class="min-h-screen h-full">
			<slot></slot>
		</main>
	</div>
</template>
