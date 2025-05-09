
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Add the useMediaQuery hook to serve as a more flexible version of useIsMobile
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    
    // Set the initial value
    setMatches(mediaQuery.matches)
    
    // Define a callback function to handle changes
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add the callback as a listener for changes to the media query
    mediaQuery.addEventListener("change", handler)
    
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [query])

  return matches
}
