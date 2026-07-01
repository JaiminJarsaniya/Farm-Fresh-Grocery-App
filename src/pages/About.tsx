
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="About Farm Fresh" 
          subtitle="Bringing nature's best directly to your table" 
          centered
        />

        <div className="mb-12">
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1770&auto=format&fit=crop" 
              alt="Farm Fresh fields and produce" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <h2>Our Story</h2>
            <p>
              Farm Fresh began in 2015 with a simple mission: to reconnect people with the source of their food. Our founder, Sarah Mitchell, grew up on a small family farm and witnessed first-hand how industrial agriculture was creating distance between consumers and their food sources.
            </p>
            <p>
              After working for years in traditional grocery retail, Sarah became increasingly concerned with the quality, freshness, and sustainability of the produce being sold. She envisioned a better way—a direct farm-to-table approach that would benefit both consumers and local farmers.
            </p>
            <p>
              Starting with just three partner farms and a small group of dedicated customers, Farm Fresh has grown into a thriving community of over 50 local farmers and thousands of households who share our passion for fresh, sustainable, and locally-sourced food.
            </p>

            <h2>Our Mission</h2>
            <p>
              At Farm Fresh, we're dedicated to:
            </p>
            <ul>
              <li><strong>Supporting local agriculture</strong> by creating viable markets for small and medium-sized farms</li>
              <li><strong>Promoting sustainable farming practices</strong> that protect our environment for future generations</li>
              <li><strong>Providing the freshest produce possible</strong> by minimizing the time from harvest to table</li>
              <li><strong>Building community connections</strong> between those who grow our food and those who eat it</li>
              <li><strong>Making healthy eating accessible</strong> to as many people as possible</li>
            </ul>

            <h2>Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 not-prose my-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 9h-1.586a1 1 0 0 1-.707-.293l-1.121-1.121A2 2 0 0 0 17.172 7H14a2 2 0 0 0-2 2v6"/><path d="M18 11a2 2 0 0 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V8a2 2 0 0 1 2-2h3"/><circle cx="6" cy="11" r="2"/><circle cx="6" cy="18" r="2"/></svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Sustainability</h3>
                <p className="text-muted-foreground">We believe in environmentally responsible practices that preserve our planet for future generations.</p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Transparency</h3>
                <p className="text-muted-foreground">We provide clear information about where our food comes from and how it's grown.</p>
              </div>
              
              <div className="bg-primary/5 p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M7 10v12"/><path d="M17 10v12"/><path d="M2 10h20"/><path d="M2 14h20"/><path d="m5 2 7 8 7-8"/></svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Community</h3>
                <p className="text-muted-foreground">We foster connections between farmers, consumers, and all members of our local food system.</p>
              </div>
            </div>

            <h2>Our Farming Partners</h2>
            <p>
              We carefully select our farming partners based on their commitment to sustainable practices and the quality of their produce. Our partner farms range from multi-generational family operations to innovative new growers, all united by their dedication to responsible stewardship of the land.
            </p>
            <p>
              We regularly visit each partner farm to ensure they meet our standards for:
            </p>
            <ul>
              <li>Minimal use of pesticides and synthetic fertilizers</li>
              <li>Responsible water management</li>
              <li>Soil conservation and improvement</li>
              <li>Ethical labor practices</li>
              <li>Humane animal treatment (for animal products)</li>
            </ul>

            <div className="bg-primary/5 p-6 rounded-lg my-8">
              <h3 className="text-xl font-medium mb-2">Join Our Mission</h3>
              <p>
                We're always looking to grow our community of conscious eaters and sustainable producers. Whether you're a customer looking for the freshest produce, a farmer seeking new markets, or someone passionate about sustainable food systems, we'd love to connect with you.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link to="/products">
                  <Button>Shop Our Products</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline">Contact Us</Button>
                </Link>
              </div>
            </div>

            <Separator className="my-8" />

            <h2>Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 not-prose my-8">
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[200px]">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1887&auto=format&fit=crop" 
                    alt="Sarah Mitchell - Founder & CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Sarah Mitchell</h3>
                <p className="text-primary mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">A third-generation farmer with a passion for sustainable agriculture and community building.</p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[200px]">
                  <img 
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1770&auto=format&fit=crop" 
                    alt="David Rodriguez - Head of Operations" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">David Rodriguez</h3>
                <p className="text-primary mb-2">Head of Operations</p>
                <p className="text-sm text-muted-foreground">With 15 years in sustainable food systems, David ensures our operation runs smoothly while upholding our values.</p>
              </div>
              
              <div className="text-center">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[200px]">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                    alt="Lisa Chen - Farm Relations" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">Lisa Chen</h3>
                <p className="text-primary mb-2">Farm Relations</p>
                <p className="text-sm text-muted-foreground">Lisa works directly with our network of farmers to ensure quality standards and fair partnerships.</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
