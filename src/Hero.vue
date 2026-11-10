<script setup lang="ts">
import { computed } from 'vue'
import { useHost } from '@sitebill/theme-sdk'
import { SbAiSearch, SbSearchForm, UIcon } from '@sitebill/theme-sdk/components'

const host = useHost()

// Реальные счётчики сайта; await — чтобы цифры были в HTML с сервера.
const stats = await host.data.use('siteStats')
const statItems = computed(() => {
  const s = stats.data.value
  if (!s) return []
  return [
    { value: host.format.number(s.listings), label: host.tc('hero.listings', s.listings) },
    { value: host.format.number(s.cities), label: host.tc('hero.cities', s.cities) },
  ].filter(i => i.value !== '0')
})
</script>

<template>
  <section class="relative -mx-4 -mt-4 mb-16 overflow-hidden rounded-b-3xl border-b border-default bg-gradient-to-br from-slate-50 via-white to-primary-50 px-4 py-20 sm:-mx-6 sm:-mt-7 lg:-mx-8 dark:border-transparent dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div class="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

    <div class="relative mx-auto mb-10 max-w-3xl text-center">
      <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
        <UIcon name="i-lucide-sparkles" class="size-4" />
        {{ host.t('hero.badge') }}
      </div>
      <h1 class="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        {{ host.t('hero.title') }}
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400">{{ host.t('hero.subtitle') }}</p>
    </div>

    <div class="relative mx-auto max-w-4xl">
      <!-- Форма поиска сайта: поля настраивает тенант. -->
      <SbSearchForm />
      <SbAiSearch v-if="host.site.value.features.aiSearch" />
    </div>

    <div v-if="statItems.length" class="relative mx-auto mt-10 flex max-w-3xl justify-center gap-10">
      <div v-for="item in statItems" :key="item.label" class="text-center">
        <p class="text-2xl font-bold text-highlighted">{{ item.value }}</p>
        <p class="text-sm text-muted">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>
