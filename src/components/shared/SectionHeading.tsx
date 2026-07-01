
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl",
        centered ? "mx-auto text-center" : "",
        className
      )}
    >
      <h2 className="font-poppins text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
