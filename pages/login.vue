<script setup lang="ts">
	import { z } from 'zod'
	import { AuthError } from '@supabase/supabase-js'
	const loginSchema = z.object({
		email: z
			.string()
			.email({ message: 'Formato de correo electrónico ingresado no válido' }),
		password: z.string().min(3, { message: 'Campo requerido' }),
	})
	type LoginFields = z.infer<typeof loginSchema>
	type Errors = {
		authErrors: AuthError
		fieldErrors: z.ZodError<LoginFields | null>
	}
	const inputModels = ref<LoginFields>({ email: '', password: '' })
	const errors = ref<Errors>({} as Errors)
	const isSubmitting = ref(false)
	const router = useRouter()
	const client = useSupabaseAuthClient()

	definePageMeta({ middleware: ['auth'] })
	useHead({ title: 'Nexy - Iniciar sesión' })

	const loginViaEmail = async () => {
		const result = loginSchema.safeParse(inputModels.value)
		isSubmitting.value = true
		if (!result.success) {
			errors.value.fieldErrors = result.error
			isSubmitting.value = false
		} else {
			const { data: user, error } = await client.auth.signInWithPassword({
				email: result.data.email,
				password: result.data.password,
			})
			if (error) {
				isSubmitting.value = false
				errors.value.authErrors = error
			} else if (user) {
				isSubmitting.value = false
				router.push('/home')
			}
		}
	}
</script>

<template>
	<main class="min-h-screen h-full grid place-items-center font-roboto">
		<form
			class="flex flex-col justify-center space-y-4 container w-full mx-auto max-w-2xl xl:p-0 p-2"
			@submit.prevent="loginViaEmail"
		>
			<h2 class="text-center text-2xl font-semibolds">Inicia sesión en Nexy!</h2>
			<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
				<label class="font-bold" for="email">Correo electrónico</label>
				<input
					class="px-5 py-4 rounded-lg outline-none bg-sky-50"
					type="email"
					name="email"
					placeholder="janedoe132@email.com"
					v-model="inputModels.email"
				/>
				<span class="c-red-500 h-6">{{
					errors.fieldErrors?.formErrors.fieldErrors.email
						? errors.fieldErrors?.formErrors.fieldErrors.email?.[0]
						: null
				}}</span>
			</aside>

			<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
				<label class="font-bold" for="password">Contraseña</label>
				<input
					class="px-5 py-4 rounded-md outline-none bg-sky-50"
					type="password"
					name="password"
					placeholder="janedoe123*"
					v-model="inputModels.password"
					:disabled="isSubmitting"
				/>
				<span class="c-red-500 h-6">{{
					errors.fieldErrors?.formErrors.fieldErrors.password
						? errors.fieldErrors?.formErrors.fieldErrors.password?.[0]
						: null
				}}</span>
			</aside>
			<button
				:class="`px-5 py-3 rounded-lg  w-full max-w-2xl ${
					isSubmitting ? 'bg-fuchsia-600' : 'bg-fuchsia-500'
				} duration-100 ease-in-out mb-10 c-neutral-50  font-bold `"
				type="submit"
				:disabled="isSubmitting"
			>
				{{ isSubmitting ? 'Iniciando...' : 'Iniciar sesión ' }}
			</button>
			<span class="c-red-500 h-6">{{
				errors.authErrors ? errors.authErrors.message : null
			}}</span>
			<NuxtLink to="/register" class="text-center underline"
				>No tengo una cuenta</NuxtLink
			>
		</form>
	</main>
</template>
