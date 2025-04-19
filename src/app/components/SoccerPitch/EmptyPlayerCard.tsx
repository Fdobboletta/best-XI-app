interface EmptyPlayerCardProps {
  position: string;
}

export const EmptyPlayerCard = ({ position }: EmptyPlayerCardProps) => (
  <div className="flex flex-col items-center opacity-40">
    <div className="bg-gray-500 text-white text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 rounded mb-1 sm:mb-2">
      -
    </div>

    <div className="relative">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-black/40 border border-white/10">
        <div className="w-full h-full flex items-center justify-center text-white/50">
          ?
        </div>
      </div>

      <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
        <span className="text-[7px] sm:text-[8px] text-white/80 font-medium">
          {position}
        </span>
      </div>
    </div>

    <div className="mt-1 sm:mt-2 text-center">
      <p className="text-white/50 text-[10px] sm:text-xs font-medium whitespace-nowrap">
        Sin jugador
      </p>
    </div>
  </div>
);
