import { createFileRoute } from '@tanstack/react-router'
import ChangelogPage from '../features/Changelog/ChangelogPage'

export const Route = createFileRoute('/changelog')({
  component: ChangelogPage,
})
