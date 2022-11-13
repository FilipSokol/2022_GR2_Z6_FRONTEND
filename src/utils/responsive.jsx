import { useMediaQuery } from "react-responsive";

export const lg = 976;
export const xl = 1280;

export const useResponsive = () => {
  const isDesktop = useMediaQuery({ minWidth: lg });
  const isMobile = useMediaQuery({ maxWidth: lg - 1 });
  const isSmallDesktop = useMediaQuery({ maxWidth: xl });
  return {
    isDesktop,
    isMobile,
    isSmallDesktop,
  };
};
