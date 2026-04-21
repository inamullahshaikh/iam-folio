import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inam Ullah Shaikh — AI Engineer" },
      { name: "description", content: "AI Engineer — RAG pipelines, computer vision APIs, and the cloud infra that makes them real." },
      { name: "author", content: "Inam Ullah Shaikh" },
      { property: "og:title", content: "Inam Ullah Shaikh — AI Engineer" },
      { property: "og:description", content: "RAG pipelines, computer vision APIs, and the cloud infra that makes them real." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Toaster position="top-right" theme="dark" />
        <Scripts />
      </body>
    </html>
  );
}
