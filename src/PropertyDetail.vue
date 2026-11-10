<script setup lang="ts">
import type { PropertyDetailProps } from '@sitebill/theme-sdk'
import { useHost } from '@sitebill/theme-sdk'
import {
  SbBookingWidget, SbCharacteristics, SbContactBlock, SbFavoriteButton, SbFloorPlans,
  SbLink, SbMap, SbMortgageCalculator, SbPropertyGallery, UBadge, UButton, UIcon,
} from '@sitebill/theme-sdk/components'

// Страница объекта без хлебных крошек и панели владельца — их рисует сайт.
// Форму заявки тоже рисует сайт: тема только просит её открыть (open-lead-form).
const props = defineProps<PropertyDetailProps>()
const emit = defineEmits<{ 'open-lead-form': [] }>()
const host = useHost()

function fileSize(bytes: number | null): string {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
</script>

<template>
  <div class="flex items-start gap-6 pb-24 lg:pb-0">
    <div class="min-w-0 flex-1">
      <SbPropertyGallery :images="props.property.images" class="mb-6" />

      <div class="mb-6 flex flex-wrap items-start gap-4">
        <div class="flex-1">
          <div class="mb-2 flex flex-wrap gap-2">
            <UBadge color="primary" variant="subtle">{{ props.property.dealTypeLabel }}</UBadge>
            <UBadge v-if="props.property.isNewBuilding" color="success" variant="subtle">{{ host.common('newBuilding') }}</UBadge>
          </div>
          <h1 class="text-lg font-bold text-highlighted sm:text-2xl">{{ props.property.heading }}</h1>
          <p class="mt-1 text-sm text-muted">{{ props.property.address }}</p>
          <p class="mt-0.5 text-xs text-muted/70">
            ID: {{ props.property.id }}
            <span v-if="props.property.publishedLabel"> · {{ props.property.publishedLabel }}</span>
          </p>
        </div>
        <div class="flex flex-col items-end gap-2 text-right">
          <SbFavoriteButton :property-id="props.property.id" :is-favorited="props.property.isFavorited" />
          <p class="text-3xl font-bold text-primary">{{ props.property.priceFormatted }}</p>
          <p v-if="props.property.pricePerAreaFormatted" class="text-sm text-muted">{{ props.property.pricePerAreaFormatted }}</p>
          <UButton v-if="props.property.editHref" :to="props.property.editHref" icon="i-lucide-pencil" size="sm" variant="soft" :label="host.t('detail.edit')" />
        </div>
      </div>

      <!-- Полный блок характеристик, включая кастомные поля тенанта и их группы. -->
      <SbCharacteristics :property="props.property" class="mb-6" />

      <div v-if="props.property.descriptionHtml" class="mb-6">
        <h2 class="mb-2 text-lg font-semibold">{{ host.common('description') }}</h2>
        <!-- HTML уже очищен сайтом. -->
        <div class="prose prose-sm max-w-none" v-html="props.property.descriptionHtml" />
      </div>

      <div v-if="props.property.videoEmbedUrl" class="mb-6 aspect-video overflow-hidden rounded-xl">
        <iframe :src="props.property.videoEmbedUrl" class="size-full" allowfullscreen loading="lazy" />
      </div>

      <div v-if="props.property.location" class="mb-6">
        <h2 class="mb-3 text-lg font-semibold">{{ host.common('address') }}</h2>
        <SbMap :lat="props.property.location.lat" :lng="props.property.location.lng" :title="props.property.title" />
      </div>

      <div v-if="props.property.floorPlans.length" class="mb-6">
        <h2 class="mb-3 text-lg font-semibold">{{ host.common('floorPlans') }}</h2>
        <SbFloorPlans :images="props.property.floorPlans" />
      </div>

      <div v-if="props.property.documents.length" class="mb-6">
        <h2 class="mb-3 text-lg font-semibold">{{ host.common('documents') }}</h2>
        <div class="space-y-2">
          <a
            v-for="doc in props.property.documents"
            :key="doc.url"
            :href="doc.url"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-3 rounded-lg border border-default p-3 transition-colors hover:border-primary"
          >
            <UIcon :name="doc.mimeType === 'application/pdf' ? 'i-lucide-file-text' : 'i-lucide-file'" class="size-6 shrink-0 text-muted" />
            <div class="min-w-0">
              <p class="truncate text-sm font-medium group-hover:text-primary">{{ doc.name }}</p>
              <p class="text-xs text-muted">{{ fileSize(doc.size) }}</p>
            </div>
          </a>
        </div>
      </div>

      <SbMortgageCalculator
        v-if="host.site.value.features.mortgageCalculator && props.property.dealType === 'sale' && props.property.price"
        :price="props.property.price"
        :currency="props.property.currency"
        class="mb-6"
      />

      <div v-if="props.similar.length">
        <h2 class="mb-4 text-lg font-semibold">{{ host.common('similarProperties') }}</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SbLink v-for="p in props.similar" :key="p.id" :to="p.href" class="group overflow-hidden rounded-xl border border-default">
            <img v-if="p.coverUrl" :src="p.coverUrl" :alt="p.title" loading="lazy" class="h-36 w-full object-cover">
            <div class="p-3">
              <p class="font-bold text-highlighted">{{ p.priceFormatted }}</p>
              <p class="line-clamp-2 text-sm group-hover:text-primary">{{ p.title }}</p>
            </div>
          </SbLink>
        </div>
      </div>
    </div>

    <aside class="sticky top-20 hidden w-80 shrink-0 space-y-4 lg:block">
      <SbBookingWidget v-if="props.property.booking?.enabled" :property="props.property" />
      <div class="rounded-2xl border border-default bg-default p-5 shadow-sm">
        <SbContactBlock :property="props.property" @lead="emit('open-lead-form')" />
      </div>
    </aside>

    <!-- Мобильная панель контакта -->
    <div class="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-default bg-default p-3 lg:hidden">
      <UButton class="flex-1" block color="primary" variant="soft" icon="i-lucide-send" :label="props.property.contact.ctaLabel" @click="emit('open-lead-form')" />
      <UButton v-if="props.property.contact.phone" :to="`tel:${props.property.contact.phone}`" color="primary" icon="i-lucide-phone" :aria-label="props.property.contact.phone" />
    </div>
  </div>
</template>
