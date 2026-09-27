import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm transition-[border-color,background-color,color] duration-200 ease-out [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
