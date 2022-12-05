<script setup lang="ts">
	import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/vue'
	import { User } from '@supabase/supabase-js'
	type MenuProps = {
		user: User | null
		signOut: () => void
	}
	const props = defineProps<MenuProps>()
</script>

<template>
	<Menu as="div" className="xl:hidden lg:hidden relative inline-block text-left">
		<MenuButton
			class="w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			<img
				:src="props.user?.user_metadata.avatar_url"
				class="rounded-full w-12 h-12"
			/>
		</MenuButton>

		<transition
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<MenuItems
				className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div className="px-1 py-1 ">
					<MenuItem v-slot="active">
						<button
							@click="props.signOut"
							:class="` ${
								active ? 'bg-fuchsia-500 text-white' : 'text-gray-900'
							} group flex w-full items-center rounded-md px-2 py-2 text-sm space-x-2  `"
						>
							<div class="i-carbon-logout h-6 w-6"></div>

							<span>Cerrar sesión</span>
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>
