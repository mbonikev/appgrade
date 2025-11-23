import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/awards')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/awards"!</div>
}
