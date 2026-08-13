interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md";
}

function Avatar({name,src,size = "sm",}:AvatarProps) {
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

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-purple-500 to-pink-500 font-medium text-white ${sizeClasses[size]}`}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} avatar`}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  )
}

export default Avatar
