const CrossfadeStack: React.FC<{
  images: string[];
  intervalMs?: number;
}> = ({ images, intervalMs = 3200 }) => {
  if (images.length === 0) return null;

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
    WebkitMaskComposite: 'source-in',
    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
    maskComposite: 'intersect'
  };

  /*
   * We duplicate the complete sequence.
   *
   * Example:
   *
   * 1 → 2 → 3 → 4 → 1 → 2 → 3 → 4
   *
   * The animation moves exactly through the first sequence.
   * At the end, the second sequence is visually identical
   * to the first starting position, so the loop is seamless.
   */

  const doubled = [...images, ...images];

  /*
   * Each image gets the same amount of time.
   *
   * intervalMs = time for one image to pass through.
   */

  const loopDurationMs = intervalMs * images.length;
  const loopSeconds = loopDurationMs / 1000;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)'
      }}
    >

      {/* Infinite film strip */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: `${doubled.length * 100}%`,
          display: 'flex',
          flexDirection: 'column',
          animation: `infinite-film-${images.length} ${loopSeconds}s linear infinite`,
          willChange: 'transform'
        }}
      >

        {doubled.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative w-full shrink-0"
            style={{
              height: `${100 / doubled.length}%`
            }}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={maskStyle}
              draggable={false}
            />
          </div>
        ))}

      </div>

      <style>{`

        /*
         * IMPORTANT:
         *
         * Because the strip contains two identical sequences,
         * we move exactly 50% of the complete strip.
         *
         * Therefore:
         *
         * 1 2 3 4 | 1 2 3 4
         * ↓
         * 1 2 3 4
         *
         * The browser can restart the animation here without
         * the viewer seeing any jump.
         */

        @keyframes infinite-film-${images.length} {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(0, -50%, 0);
          }
        }

      `}</style>
    </div>
  );
};
