"use client";

export function CircleSlider({ items, current, setCurrent }) {
  if (!items?.length) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-foreground shadow-[0_-25px_40px_1px_rgba(0,0,0,0.1),0_25px_40px_1px_rgba(0,0,0,0.1)]">
      {/* Track */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${current * (100 / items.length)}%)`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.name}
            className="flex h-full shrink-0 items-center justify-center"
            style={{ width: `${100 / items.length}%` }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
              {/* Logo at top — kept exactly as you had it */}
              <div className="mb-2 flex h-10 items-center justify-center sm:h-12 md:h-14 lg:h-16">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-full max-w-[80%] object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>

              <h3 className="text-background font-semibold text-[10px] min-[400px]:text-xs sm:text-sm md:text-base lg:text-lg">
                {item.name}
              </h3>

              {/* Updated text styling only */}
              <p className="card-name hidden lg:inline-block relative z-10 mt-3 text-sm font-semibold text-gray-500 tracking-wide max-w-[80%]">
                {item.centerText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots — manual only */}
      <div className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 gap-1 sm:gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 w-1 rounded-full transition-all sm:h-2 sm:w-2 lg:h-3 lg:w-3 ${
              index === current ? "bg-background scale-110" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
