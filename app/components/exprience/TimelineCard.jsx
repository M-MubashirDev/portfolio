function TimelineCard({ number, title, description, height }) {
  return (
    <div
      className={`relative bg-white border border-black/10 ${
        height ? height : ""
      } w-full max-w-xl p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow-[0_-0.5px_10px_0px_rgba(0,0,0,0.08)] rounded-[12px]`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4">
        <div className="text-black/15 text-5xl sm:text-6xl font-bold leading-none font-heading">
          {number}
        </div>
        <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight whitespace-nowrap">
          {title}
        </h3>
        <div className="bg-black/10 w-full h-px hidden sm:block" />
      </div>

      <p className="text-[13px] sm:text-sm text-black/60 leading-relaxed tracking-[-0.2px]">
        {description}
      </p>
    </div>
  );
}

export default TimelineCard;
