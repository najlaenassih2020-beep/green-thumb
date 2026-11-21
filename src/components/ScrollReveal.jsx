import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal Component
 * Wraps content to reveal them smoothly when they scroll into view.
 *
 * @param {React.ReactNode} children - The elements to be animated.
 * @param {string} variant - The reveal animation style ('up', 'down', 'left', 'right', 'scale', 'fade').
 * @param {number} delay - Animation delay in milliseconds.
 * @param {number} duration - Animation duration in milliseconds.
 * @param {number} threshold - Viewport visibility threshold to trigger the animation (0 to 1).
 * @param {string} rootMargin - Margin around the root element for intersection calculation.
 * @param {boolean} once - If true, triggers the reveal only once. If false, resets when scrolled out of view.
 * @param {string} className - Additional CSS classes for the wrapper element.
 * @param {string} as - HTML tag to render the wrapper as (default: 'div').
 */
export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  duration = 800,
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  once = true,
  className = "",
  as: Component = "div",
  ...props
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element && !once) {
        observer.unobserve(element);
      } else if (element) {
        try {
          observer.disconnect();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [threshold, rootMargin, once]);

  const style = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  const revealClass = `reveal reveal-${variant} ${isIntersecting ? "revealed" : ""}`;

  return (
    <Component
      ref={elementRef}
      className={`${revealClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
