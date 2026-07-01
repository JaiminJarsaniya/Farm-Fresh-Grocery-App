
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import CategoryCard from "@/components/shared/CategoryCard";
import { categories } from "@/lib/data";

const Categories = () => {
  return (
    <Layout>
      <SectionHeading
        title="Product Categories"
        subtitle="Browse our extensive range of fresh and healthy food categories"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      <div className="mt-16">
        <SectionHeading
          title="Why Choose Our Categories"
          subtitle="Discover the Farm Fresh difference in every category"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Quality Guaranteed</h3>
            <p className="text-muted-foreground">Every item in our categories is carefully selected to ensure premium quality and freshness.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Ethically Sourced</h3>
            <p className="text-muted-foreground">We partner with local farmers who practice sustainable and ethical farming methods.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M7 10v12"/><path d="M17 10v12"/><path d="M2 10h20"/><path d="M2 14h20"/><path d="m5 2 7 8 7-8"/></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Fresh Selection</h3>
            <p className="text-muted-foreground">Our categories are regularly updated with seasonal items to ensure maximum freshness and nutrition.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
