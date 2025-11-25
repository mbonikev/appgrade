import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user-agreement')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user-agreement"!</div>
}
