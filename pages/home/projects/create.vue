<script setup lang="ts">
	import { PostgrestError } from '@supabase/supabase-js'
	import { marked } from 'marked'
	import { z } from 'zod'

	import { Project } from '~/types'

	const createProjectSchema = z.object({
		title: z.string().min(5, { message: 'Campo requerido' }),
		description: z.string().min(5, { message: 'Campo requerido' }),
		markdown: z.string(),
	})

	type CreateProjectFields = z.infer<typeof createProjectSchema>
	type Errors = {
		fieldErrors: z.ZodError<CreateProjectFields>
		apiError: PostgrestError
	}

	const client = useSupabaseClient<Project>()
	const user = useUser()
	const projectInputModels = ref<CreateProjectFields>({
		description: '',
		title: '',
		markdown: '',
	})
	const errors = ref<Errors>({} as Errors)
	const isSubmitting = ref(false)
	const parsedMarkdown = computed(() =>
		marked.parse(projectInputModels.value.markdown)
	)
	const onSubmit = async () => {
		const formResult = createProjectSchema.safeParse(projectInputModels.value)
		isSubmitting.value = true
		if (formResult.success) {
			const newProject: Partial<Project> = {
				...formResult.data,
				userId: user.value?.id,
				hasFinished: false,
			}
			const { data, error } = await client.from('project').insert([newProject])
			if (error) errors.value.apiError = error
			isSubmitting.value = false
			projectInputModels.value = {} as CreateProjectFields
		} else {
			errors.value.fieldErrors = formResult.error
			isSubmitting.value = false
		}
	}
</script>

<template>
	<form
		class="flex flex-col justify-center space-y-4 xl:p-0 p-3 max-w-2xl"
		@submit.prevent="onSubmit"
	>
		<h2 class="text-center text-2xl font-semibold mb-3">Crear nuevo proyecto</h2>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
			<label class="font-bold" for="title">Titulo del proyecto</label>
			<input
				class="px-5 py-4 rounded-lg outline-none bg-sky-50"
				type="text"
				name="title"
				placeholder="Jane Doe's first project"
				v-model="projectInputModels.title"
			/>
			<span class="c-red-500 h-6">{{
				errors.fieldErrors?.formErrors.fieldErrors.title
					? errors.fieldErrors?.formErrors.fieldErrors.title?.[0]
					: null
			}}</span>
		</aside>

		<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
			<label class="font-bold" for="description">Descripción del proyecto</label>
			<input
				class="px-5 py-4 rounded-lg outline-none bg-sky-50"
				type="text"
				name="description"
				placeholder="Este es el primer proyecto de Jane Doe. "
				v-model="projectInputModels.description"
			/>
			<span class="c-red-500 h-6">{{
				errors.fieldErrors?.formErrors.fieldErrors.description
					? errors.fieldErrors?.formErrors.fieldErrors.description?.[0]
					: null
			}}</span>
		</aside>

		<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
			<label class="font-bold" for="description">Contenido del proyecto</label>
			<textarea
				class="px-5 py-4 h-64 rounded-lg outline-none bg-sky-50"
				name="markdown"
				placeholder="Este contenido también puede ser markdown. "
				v-model="projectInputModels.markdown"
			/>
			<span class="c-red-500 h-6">{{
				errors.fieldErrors?.formErrors.fieldErrors.markdown
					? errors.fieldErrors?.formErrors.fieldErrors.markdown?.[0]
					: null
			}}</span>
		</aside>
		<aside class="flex flex-col justify-center space-y-3 max-w-2xl w-full">
			<label class="font-medium" for="description">Vista previa del contenido</label>
			<div
				class=" min-h-64 h-full w-full rounded-lg outline-none text-base  prose prose-fuchsia"
				v-html="parsedMarkdown"
			></div>
		</aside>
		<button
			:class="`px-5 py-3 rounded-lg  w-full max-w-xl ${
				isSubmitting ? 'bg-fuchsia-600' : 'bg-fuchsia-500'
			} duration-100 ease-in-out mb-10 c-neutral-50  font-bold `"
			type="submit"
			:disabled="isSubmitting"
		>
			{{ isSubmitting ? 'Creando...' : 'Crear nuevo proyecto' }}
		</button>
		<span class="h-6 c-red-500">{{
			errors.apiError ? errors.apiError.details : null
		}}</span>
	</form>
</template>
