import React from "react";
import { JSX } from "react";


export function ErrorMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}): JSX.Element {
  return (
    <React.Fragment>
      {message && (
        <div
          className={`${className} text-red-800 text-sm mt-1 sentence-case`}
        >
          {message}
        </div>
      )}
    </React.Fragment>
  );
}
