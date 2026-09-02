'use client';

import { useState } from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md";
  referrerPolicy?:string;
  crossOrigin?:string;
}

function Avatar({name,src,size = "sm",}:AvatarProps) {
  const [imageError, setImageError] = useState(false);

   const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "h-5 w-5 text-[8px]",
    md: "h-7 w-7 text-[10px]",
  };

  //console.log(name,src)

  return (
    <div
      className={`w-full h-full flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-500 to-pink-500 font-medium text-white ${sizeClasses[size]}`}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={`${name} avatar`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer" 
          crossOrigin="anonymous"
        />
      ) : (
        initials
      )}
    </div>
  )
}

export default Avatar
