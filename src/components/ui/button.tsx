import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cms-btn",
  {
    variants: {
      variant: {
        default: "cms-btn-primary",
        destructive: "cms-btn-danger",
        outline: "cms-btn-outline",
        secondary: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white",
        ghost: "cms-btn-ghost",
        link: "text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "cms-btn-sm",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "cms-btn-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
