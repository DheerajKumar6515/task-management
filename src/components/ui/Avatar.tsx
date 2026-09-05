'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md";
  //referrerPolicy?:string;
 // crossOrigin?:string;
 referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  crossOrigin?: "" | "anonymous" | "use-credentials";
}

function Avatar({name,src,size = "sm",}:AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const safeName = name?.trim() || "Guest";

   const initials = safeName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "G";

  const sizeClasses = {
    sm: "h-5 w-5 text-[8px]",
    md: "h-7 w-7 text-[10px]",
  };

  // const isValidUrl = (url?: string | null): boolean => {
  //   if (!url || typeof url !== 'string') return false;
  //   const trimmed = url.trim();
  //   if (trimmed === '' || trimmed === 'undefined' || trimmed === 'null') return false;
  //   return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://');
  // };

  // const shouldRenderImage = isValidUrl(src) && !imageError;

  return (
    <div
      className={`w-full h-full flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-500 to-pink-500 font-medium text-white ${sizeClasses[size]}`}
    >
      {src && !imageError ? (
        <Image
          src={src as string}
          width={30}
          height={30}
          alt={`${safeName} avatar`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer" 
         // crossOrigin="anonymous"
        />
      ) : (
        initials
      )}
    </div>
  )
}

export default Avatar
