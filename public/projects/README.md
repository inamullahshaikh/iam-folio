# Project media

Drop files here to show docs and videos on project pages.

## Folder layout

```
public/projects/
  foresyte/
    demo.mp4          → video
    report.pdf        → documentation
  startup-law-rag/
    demo.mp4
    architecture.pdf
```

## Enable in code

Edit `src/data/portfolio.ts` on the project entry:

```ts
media: {
  videos: [{ label: "Demo walkthrough", url: "/projects/foresyte/demo.mp4" }],
  docs: [{ label: "FYP report", url: "/projects/foresyte/report.pdf" }],
},
```

YouTube links work too:

```ts
videos: [{ label: "Demo", url: "https://www.youtube.com/watch?v=VIDEO_ID" }],
```

Sections only appear when URLs are set.
