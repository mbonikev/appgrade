import { createFileRoute } from '@tanstack/react-router'
import CreatorsPage from '../features/Creators/Pages/CreatorsPage'

export const Route = createFileRoute('/creators')({
  component: CreatorsPage,
})
