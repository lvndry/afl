import { cn } from "@/utilities/ui";

interface RichTextProps {
  content: string;
  className?: string;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
}

export function RichText({ content, className, size = "lg" }: RichTextProps) {
  return (
    <div
      className={cn(
        "prose",
        {
          "prose-sm": size === "sm",
          "prose-base": size === "base",
          "prose-lg": size === "lg",
          "prose-xl": size === "xl",
          "prose-2xl": size === "2xl",
        },
        "max-w-none",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
