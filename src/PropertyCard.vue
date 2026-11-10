<script setup lang="ts">
import type { PropertyCardProps } from '@sitebill/theme-sdk'
import { useHost } from '@sitebill/theme-sdk'
import { SbFavoriteButton, SbLink, UBadge, UIcon } from '@sitebill/theme-sdk/components'

// Все подписи (тип сделки, площадь, цена, адрес) уже готовы и переведены сайтом.
const props = defineProps<PropertyCardProps>()
const host = useHost()
</script>

<template>
  <SbLink :to="props.property.href" class="group block">
    <!-- Плитка -->
    <article
      v-if="props.viewMode !== 'list'"
      class="h-full overflow-hidden rounded-xl border border-default bg-default transition-shadow hover:shadow-md"
      :class="{ 'opacity-60': !props.property.isPublished }"
    >
      <div class="relative h-48 overflow-hidden bg-muted">
        <img
          v-if="props.property.coverUrl"
          :src="props.property.coverUrl"
          :alt="props.property.title"
          loading="lazy"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
        <div v-else class="flex size-full items-center justify-center">
          <UIcon name="i-lucide-image" class="size-10 text-muted" />
        </div>
        <UBadge :color="props.property.dealType === 'sale' ? 'primary' : 'success'" variant="solid" class="absolute left-2 top-2">
          {{ props.property.dealTypeLabel }}
        </UBadge>
        <UBadge v-if="props.property.isNewBuilding" color="warning" variant="solid" class="absolute right-2 top-2">
          {{ host.common('newBuilding') }}
        </UBadge>
        <div class="absolute bottom-2 right-2" @click.prevent>
          <SbFavoriteButton :property-id="props.property.id" :is-favorited="props.property.isFavorited" />
        </div>
      </div>

      <div class="p-4">
        <p class="mb-1 text-xl font-bold text-highlighted">{{ props.property.priceFormatted }}</p>
        <p class="mb-1 text-sm text-muted">
          {{ props.property.areaLabel }}
          <span v-if="props.property.floor"> · {{ host.t('card.floor', { floor: props.property.floor, total: props.property.floorsTotal ?? '?' }) }}</span>
        </p>
        <p class="mb-2 line-clamp-2 font-medium text-highlighted transition-colors group-hover:text-primary">{{ props.property.title }}</p>
        <p class="line-clamp-1 text-xs text-muted">{{ props.property.address }}</p>
        <p v-if="props.property.publishedLabel" class="mt-0.5 text-[11px] text-muted/70">{{ props.property.publishedLabel }}</p>
        <div v-if="props.property.badges.length" class="mt-2 flex flex-wrap gap-1">
          <UBadge v-for="b in props.property.badges" :key="b" size="xs" color="neutral" variant="subtle">{{ b }}</UBadge>
        </div>
      </div>
    </article>

    <!-- Список -->
    <article
      v-else
      class="flex overflow-hidden rounded-xl border border-default bg-default transition-shadow hover:shadow-md"
      :class="{ 'opacity-60': !props.property.isPublished }"
    >
      <div class="relative w-44 shrink-0 overflow-hidden bg-muted sm:w-56">
        <img v-if="props.property.coverUrl" :src="props.property.coverUrl" :alt="props.property.title" loading="lazy" class="size-full object-cover">
        <UBadge :color="props.property.dealType === 'sale' ? 'primary' : 'success'" variant="solid" class="absolute left-2 top-2">
          {{ props.property.dealTypeLabel }}
        </UBadge>
      </div>
      <div class="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <div class="mb-1 flex items-start justify-between gap-2">
            <p class="text-lg font-bold text-highlighted">{{ props.property.priceFormatted }}</p>
            <div @click.prevent>
              <SbFavoriteButton :property-id="props.property.id" :is-favorited="props.property.isFavorited" />
            </div>
          </div>
          <p class="mb-2 text-sm text-muted">{{ props.property.areaLabel }}</p>
          <p class="mb-1 line-clamp-2 font-medium text-highlighted group-hover:text-primary">{{ props.property.title }}</p>
          <p class="line-clamp-1 text-xs text-muted">{{ props.property.address }}</p>
        </div>
        <div v-if="props.property.badges.length" class="mt-2 flex flex-wrap gap-1">
          <UBadge v-for="b in props.property.badges" :key="b" size="xs" color="neutral" variant="subtle">{{ b }}</UBadge>
        </div>
      </div>
    </article>
  </SbLink>
</template>
