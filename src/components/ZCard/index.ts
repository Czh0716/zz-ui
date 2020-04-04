import ZCard from './ZCard.vue'
import { createSimpleFunctional } from '@/util/helper'

const ZCardTitle = createSimpleFunctional('z-card--title')
const ZCardText = createSimpleFunctional('z-card--text')

export default {
    ZCard,
    ZCardTitle,
    ZCardText
}
