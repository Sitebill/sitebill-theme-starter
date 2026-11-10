// Точка входа темы. Слоты, перечисленные здесь, должны совпадать с manifest.json → slots.
import { defineTheme } from '@sitebill/theme-sdk'
import './style.css'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Hero from './Hero.vue'
import PropertyCard from './PropertyCard.vue'
import PropertyDetail from './PropertyDetail.vue'

export default defineTheme({
  components: { Header, Footer, Hero, PropertyCard, PropertyDetail },
})
