import { createFileRoute } from "@tanstack/react-router";
import Home from "../features/Home/pages/Home";

export const Route = createFileRoute("/")({
  component: () => <Home />,
});
