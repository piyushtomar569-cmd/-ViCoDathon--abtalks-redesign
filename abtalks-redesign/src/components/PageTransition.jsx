import { useLocation } from "react-router-dom";

/**
 * Keys its child by the current pathname so React remounts it on every
 * navigation, which re-triggers the `.page-enter` CSS animation (fade +
 * rise + slight blur-in) for a lightweight route-transition effect without
 * needing an animation library.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
