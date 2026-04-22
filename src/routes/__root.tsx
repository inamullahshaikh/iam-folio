import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="login-wrap">
      <div className="login-card" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/" className="btn btn-primary">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" theme="dark" />
    </>
  );
}
