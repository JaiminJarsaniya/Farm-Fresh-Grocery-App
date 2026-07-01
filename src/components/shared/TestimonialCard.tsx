
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  testimonial: string;
  rating: number;
  className?: string;
}

const TestimonialCard = ({
  name,
  role,
  image,
  testimonial,
  rating,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl shadow-sm border flex flex-col h-full card-hover",
        className
      )}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <img
            src={image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-poppins font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4 mr-1",
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground flex-1">{testimonial}</p>
    </div>
  );
};

export default TestimonialCard;
