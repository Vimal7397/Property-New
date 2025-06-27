"use client";
import { useState,useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

const Bookmarkbutton = ({property}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
  if (!userId){
    setIsBookmarked(false);
    return;
  }
  checkBookmarkStatus(property._id).then((res) => {
    if(res.error){
      toast.error(res.error);
      return;
    }
    setIsBookmarked(res.isBookmarked);
  })
  }
  )

  const handleclick = async () => {
    if(!userId){
      if(!userId){
        toast.error("Please login to bookmark properties", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
    bookmarkProperty(property._id).then((res) => {
      if(res.error)
       
        return toast.error(res.error);
        setIsBookmarked(res.isBookmarked);
        toast.success(res.message);
    })
  }

    return isBookmarked ? ( <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleclick}>
      <FaBookmark className='mr-2'/>Bookmark Property
    </button>
   ):( <button
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center" onClick={handleclick}>
    <FaBookmark className='mr-2'/>Bookmark Property
  </button>
 );
};
 
export default Bookmarkbutton;