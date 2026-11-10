<script setup lang="ts">
import { useHost } from '@sitebill/theme-sdk'
import { SbCopyright, SbFooterCounters, SbFooterMenu } from '@sitebill/theme-sdk/components'

const { site } = useHost()
</script>

<template>
  <footer class="mt-auto shrink-0 border-t border-default py-8">
    <div class="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <!-- Меню подвала: настроенное в /admin/menus или стандартное. -->
      <SbFooterMenu />

      <div v-if="site.contacts.phone || site.contacts.email" class="flex flex-wrap gap-4 text-sm text-muted">
        <a v-if="site.contacts.phone" :href="`tel:${site.contacts.phone}`" class="hover:text-primary">{{ site.contacts.phone }}</a>
        <a v-if="site.contacts.email" :href="`mailto:${site.contacts.email}`" class="hover:text-primary">{{ site.contacts.email }}</a>
        <span v-if="site.contacts.address">{{ site.contacts.address }}</span>
      </div>

      <!-- Счётчики аналитики тенанта. -->
      <SbFooterCounters />
      <p class="text-sm text-muted"><SbCopyright /></p>
    </div>
  </footer>
</template>
