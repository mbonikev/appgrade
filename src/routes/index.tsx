import { createFileRoute } from "@tanstack/react-router";
import Home from "../features/Home/Pages/Home";

export const Route = createFileRoute("/")({
  component: () => <Home />,
});
