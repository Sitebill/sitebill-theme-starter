<script setup lang="ts">
import { ref } from 'vue'
import { useHost } from '@sitebill/theme-sdk'
import {
  SbClientOnly, SbLink, SbLogo, SbNotificationBell,
  UAvatar, UButton, UColorModeButton, UDropdownMenu, UNavigationMenu,
} from '@sitebill/theme-sdk/components'

// Данные шапки — только через useHost(): меню тенанта, языки, пользователь, ссылки.
const host = useHost()
const { site, user, nav, links } = host
const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/80 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
      <UButton
        class="lg:hidden"
        icon="i-lucide-menu"
        variant="ghost"
        color="neutral"
        :aria-label="host.t('header.menu')"
        @click="mobileOpen = !mobileOpen"
      />

      <SbLink :to="links.home" class="shrink-0">
        <SbLogo />
      </SbLink>

      <UNavigationMenu :items="nav.main.value" class="hidden lg:flex" :ui="{ linkLeadingIcon: 'hidden' }" />

      <div class="ml-auto flex items-center gap-1">
        <UDropdownMenu v-if="site.locales.length > 1" :items="nav.languages.value" :content="{ side: 'bottom', align: 'end' }">
          <UButton :label="site.locale.toUpperCase()" variant="ghost" color="neutral" size="sm" trailing-icon="i-lucide-chevron-down" />
        </UDropdownMenu>

        <UColorModeButton />

        <!-- Состояние входа известно только в браузере: на сервере user всегда null. -->
        <SbClientOnly>
          <template v-if="user">
            <SbNotificationBell />
            <UButton
              v-if="site.features.chat"
              icon="i-lucide-message-square"
              variant="ghost"
              color="neutral"
              size="sm"
              :aria-label="host.common('messages')"
              :to="links.messages"
            />
            <UDropdownMenu :items="nav.user.value" :content="{ side: 'bottom', align: 'end' }">
              <UAvatar :src="user.avatarUrl ?? undefined" :alt="user.name" icon="i-heroicons-user" size="md" class="cursor-pointer rounded-lg" />
            </UDropdownMenu>
          </template>
          <UButton v-else :label="host.common('login')" :to="links.login" variant="ghost" color="neutral" />
        </SbClientOnly>
      </div>
    </div>

    <div v-if="mobileOpen" class="border-t border-default px-4 py-3 lg:hidden">
      <UNavigationMenu :items="nav.main.value" orientation="vertical" />
    </div>
  </header>
</template>
