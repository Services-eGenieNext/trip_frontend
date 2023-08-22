import ShareLink from 'react-linkedin-share-link'
import { FaLinkedinIn } from "react-icons/fa";
import styles from "./social.module.css";
import {useSearchParams} from 'next/navigation'

export default function Linkdin() {
     const params = useSearchParams();
  const paramsAddress = params.get("address");
  const URL = `https://weplan.ai/trip-plan?address${paramsAddress}`
  return (
    <ShareLink link={URL}>
   {(link: string | undefined) => (
      <a href={link} target='_blank'>
        <div
          className={`${styles["social_icon"]} rounded-full flex justify-center items-center text-white text-[12px]`}
        >
          <FaLinkedinIn />
        </div>
      </a>
   )}
</ShareLink>
  );
}
