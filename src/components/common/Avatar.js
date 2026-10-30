import { useState } from "react";

/**
 * Profile photo. Put your photo at `public/avatar.jpg` (square, ≥ 400×400
 * recommended). Until that file exists, a neutral placeholder with initials
 * is shown instead.
 */
export const AVATAR_SRC = "/avatar.jpg";

export default function Avatar({
  size = 120,
  className = "",
  alt = "Heng (Jimmy) Sun",
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`avatar ${className}`}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span
          className="avatar__placeholder"
          aria-label={alt}
          role="img"
          style={{ fontSize: Math.round(size * 0.3) }}
        >
          HS
        </span>
      ) : (
        <img
          src={AVATAR_SRC}
          alt={alt}
          width={size}
          height={size}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
