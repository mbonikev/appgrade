import { createFileRoute } from '@tanstack/react-router'
import SupportPage from '../features/Support/Pages/SupportPage'

export const Route = createFileRoute('/support')({
    component: SupportPage,
})
