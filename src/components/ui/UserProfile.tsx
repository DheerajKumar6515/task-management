'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient'; 
import Avatar from '@/components/ui/Avatar'; 
import { useContextData } from '@/Context/GlobalContext';
import { CleanAvatar } from '@/components/ui/CleanAvatar';


export default function UserProfile() {
  const {userDetails,setUserDetails}=useContextData(); 
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

   async function getUserData() {

     try{
      const { data: { user },error } = await supabase.auth.getUser();

      if (user) {
        // Google OAuth user data metadata me hota hai
        const googleName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || "Users";
        const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        const email=user.email || '';
        const userId=user.id || "";
        
        //for context 
         setUserDetails({userId,googleName,googleAvatar,email});
      } else {
         setUserDetails(null);
         // console.log("No logged-in user");
    
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

  const avatarSrc = userDetails?.googleAvatar 
    ? CleanAvatar(userDetails.googleAvatar) 
    : '/defaultimg.png';

  return (
    <div className="h-full">
      <Avatar 
        name={userDetails?.googleName || 'Guest'}
        src={avatarSrc || '/defaultimg.png'}
        size="md" 
      />
    </div>
  );
}