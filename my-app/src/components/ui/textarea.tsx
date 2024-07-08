import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex outline-none font-medium h-10 px-3 w-full text-sm border border-gray-200 bg-white dark:bg-grayDarker focus:!border-primary transition-all dark:border-opacity-10 rounded-md min-h-20 resize-none p-3",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
