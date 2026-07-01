
import { Link } from "react-router-dom";
import { Category } from "@/lib/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative block overflow-hidden rounded-xl bg-gray-100 transition-all hover:shadow-md card-hover"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-poppins font-semibold text-lg">
          {category.name}
        </h3>
        <p className="text-sm font-medium">{category.productCount} Products</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
