import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '../features/Profile/pages/ProfilePage'

export const Route = createFileRoute('/profile/$profileId')({
    component: () => {
        const { profileId } = Route.useParams()
        return <ProfilePage profileId={profileId} />
    },
})
