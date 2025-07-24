import { useState } from "react";

// Single toggleable save badge
export default function SavePostBadge({
  size = 20,
  color = "#000",
  filled = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  const [isFilled, setIsFilled] = useState(filled);

  return isFilled ? (
    // <svg 
    //   onClick={() => setIsFilled(false)}
    //   width={size}
    //   height={size}
    //   viewBox="0 0 22 22"
    //   fill={color}
    //   stroke={color}
    //   strokeWidth="2"
    //   className="dark:stroke-white dark:fill-white fill-black cursor-pointer"
    // >
    //   <path d="M6 4C5.447 4 5 4.447 5 5v15l7-6 7 6V5c0-.553-.447-1-1-1H6z" />
    // </svg>
    <svg onClick={() => setIsFilled(false)} width="16" height="20" viewBox="0 0 16 21" fill={color} stroke={color} xmlns="http://www.w3.org/2000/svg" className="dark:stroke-white dark:fill-white fill-black cursor-pointer">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.928711 1.19139L2.00524 0.125H14.9235L16.0001 1.19139V20.125L8.46439 15.7015L0.928711 20.125V1.19139ZM3.08176 2.25777V16.3821L8.46439 13.2224L13.847 16.3821V2.25777H3.08176Z" fill={color}/>
</svg>

  ) : (
    // <svg
    //   onClick={() => setIsFilled(true)}
    //   width={size}
    //   height={size}
    //   viewBox="0 0 22 22"
    //   fill="none"
    //   stroke={color}
    //   strokeWidth="2"
    //   className="dark:stroke-white cursor-pointer"
    // >
    //   <path d="M6 4c-.553 0-1 .447-1 1v15l7-6 7 6V5c0-.553-.447-1-1-1H6z" />
    // </svg>
    <svg onClick={() => setIsFilled(true)} width="16" height="20" viewBox="0 0 16 21" fill="none" stroke={color} xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.928711 1.19139L2.00524 0.125H14.9235L16.0001 1.19139V20.125L8.46439 15.7015L0.928711 20.125V1.19139ZM3.08176 2.25777V16.3821L8.46439 13.2224L13.847 16.3821V2.25777H3.08176Z" fill="none"/>
</svg>

  );
}

// Another version for popover context (optional)
export function PostPopoverSaveBadge({
  size = 24,
  color = "#000",
  filled = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  const [isFilled, setIsFilled] = useState(filled);

  return isFilled ? (
    <svg
      onClick={() => setIsFilled(false)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="2"
      className="dark:stroke-white dark:fill-white cursor-pointer"
    >
      <path d="M6 4C5.447 4 5 4.447 5 5v15l7-6 7 6V5c0-.553-.447-1-1-1H6z" />
    </svg>
  ) : (
    <svg
      onClick={() => setIsFilled(true)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className="dark:stroke-white  cursor-pointer"
    >
      <path d="M6 4c-.553 0-1 .447-1 1v15l7-6 7 6V5c0-.553-.447-1-1-1H6z" />
    </svg>
  );
}
