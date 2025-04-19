"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterBarProps {
  currentWeek: number;
  totalWeeks: number;
}

export function FilterBar({ currentWeek, totalWeeks }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  return (
    <div className="bg-[#1a1a1a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-6">
          {/* Week Filter */}
          <div className="flex items-center gap-3">
            <label htmlFor="week" className="text-white text-sm font-medium">
              Semana:
            </label>
            <select
              id="week"
              className="bg-[#2a2a2a] text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={currentWeek}
              onChange={(e) => handleFilterChange("week", e.target.value)}
            >
              {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(
                (week) => (
                  <option key={week} value={week}>
                    Semana {week}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Age Filter */}
          <div className="flex items-center gap-3">
            <label htmlFor="age" className="text-white text-sm font-medium">
              Edad:
            </label>
            <select
              id="age"
              className="bg-[#2a2a2a] text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue=""
              onChange={(e) => handleFilterChange("age", e.target.value)}
            >
              <option value="">Todas las edades</option>
              <option value="u21">Sub-21</option>
              <option value="21-25">21-25 años</option>
              <option value="26-30">26-30 años</option>
              <option value="o30">Más de 30</option>
            </select>
          </div>

          {/* Market Value Filter */}
          <div className="flex items-center gap-3">
            <label htmlFor="value" className="text-white text-sm font-medium">
              Valor de mercado:
            </label>
            <select
              id="value"
              className="bg-[#2a2a2a] text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue=""
              onChange={(e) => handleFilterChange("value", e.target.value)}
            >
              <option value="">Todos los valores</option>
              <option value="u10">Menos de 10M€</option>
              <option value="10-30">10M€ - 30M€</option>
              <option value="30-50">30M€ - 50M€</option>
              <option value="o50">Más de 50M€</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
