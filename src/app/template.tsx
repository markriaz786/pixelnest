import { ViewTransition } from "react";

// A template remounts on every navigation, so the old page plays its exit and
// the new one its enter (see the page-* view transition styles in globals.css).
// The header and footer live in the layout and stay put.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
