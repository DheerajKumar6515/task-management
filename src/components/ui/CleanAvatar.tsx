 export function CleanAvatar(url?:string):string | undefined{
    if(!url) return undefined;

    if(url.includes('googleusercontent.com')){
      return url.replace(/=s\d+(-c)?$/, '=s120-c');
    }

    return url;
  }