<script setup lang="ts">
	const user = useSupabaseUser()
	const client = useSupabaseAuthClient()
	const router = useRouter()
	const signOut = async () => {
		await client.auth.signOut()
	}
	client.auth.onAuthStateChange((ev, sess) => {
		if (ev === 'SIGNED_OUT' || !sess) router.push('/login')
	})
</script>

<template>
	<div class="h-full w-full">
		<header class="p-5 shadow-neutral-50 shadow-sm">
			<nav
				class="flex flex-row items-center justify-between container mx-auto max-w-2xl font-inter text-lg"
			>
				<h1><NuxtLink to="/home">Nexy</NuxtLink></h1>

				<NavMenu :user="user" :sign-out="signOut" />
			</nav>
		</header>
		<main class="min-h-screen h-full font-roboto container mx-auto max-w-xl">
			<NuxtPage />
		</main>
	</div>
</template>
