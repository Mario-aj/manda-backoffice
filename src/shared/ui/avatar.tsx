import type { CSSProperties } from "react";
import styles from "./avatar.module.css";

const AV_PALETTE: [string, string][] = [
  ["#0B4D2F", "#C6F0D6"],
  ["#7A3D0E", "#FFE0B8"],
  ["#3D2A6E", "#E1D9FF"],
  ["#6E1A2C", "#FFD6DD"],
  ["#1A4F6E", "#CDE6F2"],
  ["#3D5E1A", "#DCEFB8"],
  ["#5E1A6E", "#F2D6FA"],
  ["#1A6E5E", "#C6F0E6"],
];

function avColors(seed: string): [string, string] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_PALETTE[h % AV_PALETTE.length];
}

type AvatarProps = {
  name?: string;
  size?: 36 | 38 | 44;
};

export function Avatar({ name = "?", size = 44 }: AvatarProps) {
  const [ink, bg] = avColors(name);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase();

  const sizeClass =
    size === 36 ? styles.size36 : size === 38 ? styles.size38 : undefined;

  const avatarStyle = {
    "--avatar-bg": bg,
    "--avatar-ink": ink,
  } as CSSProperties;

  return (
    <div
      className={[styles.avatar, sizeClass].filter(Boolean).join(" ")}
      style={avatarStyle}
    >
      {initials}
    </div>
  );
}
