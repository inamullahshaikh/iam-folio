import type { ProjectMediaItem } from "../data/portfolio";

function youtubeEmbed(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export default function ProjectMedia({
  docs,
  videos,
}: {
  docs?: ProjectMediaItem[];
  videos?: ProjectMediaItem[];
}) {
  const hasDocs = docs && docs.length > 0;
  const hasVideos = videos && videos.length > 0;

  if (!hasDocs && !hasVideos) return null;

  return (
    <section className="mt-8 space-y-6 border-t border-line pt-8">
      {hasVideos && (
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-faint">
            Videos
          </h2>
          <div className="mt-3 space-y-4">
            {videos!.map((video) => {
              const embed = youtubeEmbed(video.url);
              if (embed) {
                return (
                  <div key={video.url}>
                    <p className="mb-2 text-sm text-ink-soft">{video.label}</p>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-ink/5">
                      <iframe
                        src={embed}
                        title={video.label}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              }
              if (isVideoFile(video.url)) {
                return (
                  <div key={video.url}>
                    <p className="mb-2 text-sm text-ink-soft">{video.label}</p>
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full rounded-lg border border-line"
                      src={video.url}
                    />
                  </div>
                );
              }
              return (
                <a
                  key={video.url}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rust block text-sm"
                >
                  {video.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {hasDocs && (
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-ink-faint">
            Documentation
          </h2>
          <ul className="mt-3 space-y-2">
            {docs!.map((doc) => (
              <li key={doc.url}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-rust text-sm"
                >
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
