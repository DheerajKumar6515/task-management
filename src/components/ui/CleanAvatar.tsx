export function CleanAvatar(url?: string | null): string {
  if (!url || typeof url !== "string") return "/defaultimg.png";

  if (url.includes("googleusercontent.com")) {
    return url.replace(/=s\d+(-c)?$/, "=s120-c");
  }

  return url;
}
