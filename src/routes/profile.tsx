import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '../features/Profile/Pages/ProfilePage'

export const Route = createFileRoute('/profile')({
    component: () => <ProfilePage />,
})
