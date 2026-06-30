export function WhyChoseText({
  active = false,
  title = "Collaborative Partnership",
  descrption = "We build long-term partnerships, offering continuous support and updates to keep your digital products thriving.",
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2
        className={`text-[8px] md:text-base lg:text-lg xl:text-xl font-semibold leading-[150%] transition-colors duration-300 ${
          active ? "text-black" : "text-gray-500"
        } mb-1`}
      >
        {title}
      </h2>
      <p
        className={`text-[8px] lg:text-[16px] xl:text-lg font-normal max-w-36 lg:max-w-80 transition-colors duration-300 ${
          active ? "text-black" : "text-gray-500"
        }`}
      >
        {descrption}
      </p>
    </div>
  );
}
