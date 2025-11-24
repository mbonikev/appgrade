import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$profileId')({
    component: () => {
        const { profileId } = Route.useParams()
        return <ProfilePage profileId={profileId} />
    },
})
