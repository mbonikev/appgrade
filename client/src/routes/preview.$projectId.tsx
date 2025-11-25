import { createFileRoute } from '@tanstack/react-router'
import PreviewPage from '../features/Preview/Pages/PreviewPage'

export const Route = createFileRoute('/preview/$projectId')({
    component: PreviewPage,
})
