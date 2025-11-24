import { createFileRoute } from '@tanstack/react-router'
import AwardsPage from '../features/Awards/Pages/AwardsPage'

export const Route = createFileRoute('/awards')({
  component: AwardsPage,
})
