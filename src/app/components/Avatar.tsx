import Image from "next/image";
import { ClubColor } from "@/app/lib/clubColors";

interface AvatarProps {
  name: string;
  imageUrl: string | null;
  clubColor: ClubColor;
  size?: number;
  focused?: boolean;
}

export function Avatar({
  name,
  imageUrl,
  clubColor,
  size = 52,
  focused = false,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const ringInset = focused ? -4 : -3;
  const ringOpacity = focused ? 1 : 0.6;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Club color ring */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: ringInset,
          borderRadius: "50%",
          background: `conic-gradient(from 220deg, ${clubColor.hex} 0deg, transparent 200deg)`,
          opacity: ringOpacity,
          filter: "blur(0.4px)",
          transition: focused ? "none" : "opacity 160ms ease",
        }}
      />

      {/* Avatar body */}
      <div
        className="relative overflow-hidden rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(120% 120% at 30% 20%, hsl(${clubColor.hue}, 55%, 32%), hsl(${clubColor.hue}, 35%, 10%))`,
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes={`${size}px`}
            className="object-cover"
          />
        ) : (
          <span
            className="font-semibold select-none"
            style={{
              fontSize: size * 0.34,
              color: "var(--text)",
              fontFamily: "var(--font-display)",
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
