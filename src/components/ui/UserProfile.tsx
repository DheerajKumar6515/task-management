'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient'; 
import Avatar from '@/components/ui/Avatar'; 
import { useContextData } from '@/Context/GlobalContext';
import { CleanAvatar } from '@/components/ui/CleanAvatar';


export default function UserProfile() {
  const {setUserDetails}=useContextData();
  const [userName, setUserName] = useState<string>('Guest');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

   async function getUserData() {

     try{
      const { data: { user },error } = await supabase.auth.getUser();

    //   if (error) {
    //   console.error("Get user error:", error.message);
    //   return;
    // }

      if (user) {
        // Google OAuth user data metadata me hota hai
        const googleName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Users";
        const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        const email=user.email || '';
        
        setUserName(googleName);
        setAvatarUrl(googleAvatar); 
        //for context 
         setUserDetails({googleName,googleAvatar,email});
      } else {
         setUserDetails(null);
         // console.log("No logged-in user");
        // Guest User
        setUserName('Guest User');
        setAvatarUrl(undefined);
      }
      setLoading(false);
    }catch(error){
        console.error("Unexpected error:", error);
    }finally {
    setLoading(false);
  }
    }

 
  useEffect(() => {
    getUserData();
  },[]);


  if (loading) return null;

  return (
    <div className="h-full">
      <Avatar 
        name={userName} 
        src={CleanAvatar(avatarUrl)} 
        size="md" 
      />
    </div>
  );
}