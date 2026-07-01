
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <SectionHeading
        title="Contact Us"
        subtitle="We'd love to hear from you! Get in touch with our team."
        centered
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Contact Form */}
        <div>
          <div className="bg-white p-6 rounded-lg border">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-primary/5 p-6 rounded-lg">
            <h3 className="font-medium text-lg mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">When will my order be delivered?</h4>
                <p className="text-sm text-muted-foreground">Orders are typically delivered within 24-48 hours of placement, depending on your location and the delivery schedule for your area.</p>
              </div>
              <div>
                <h4 className="font-medium">Do you offer subscriptions?</h4>
                <p className="text-sm text-muted-foreground">Yes, we offer weekly and monthly subscription boxes that can be customized to your preferences.</p>
              </div>
              <div>
                <h4 className="font-medium">What if I'm not satisfied with my order?</h4>
                <p className="text-sm text-muted-foreground">We offer a 100% satisfaction guarantee. If you're not happy with any product, please contact us within 24 hours of delivery.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-white p-6 rounded-lg border mb-8">
            <h3 className="font-medium text-lg mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground">123 Harvest Road</p>
                  <p className="text-muted-foreground">Farmington, CA 95814</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">(800) 123-4567</p>
                  <p className="text-muted-foreground">Customer Service: (800) 765-4321</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">info@farmfresh.com</p>
                  <p className="text-muted-foreground">support@farmfresh.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Business Hours</h4>
                  <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-muted-foreground">Saturday: 9:00 AM - 4:00 PM</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden h-[300px] border">
            {/* This would be an actual map in a real application */}
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Farm Fresh Location</p>
                <p className="text-sm text-muted-foreground">123 Harvest Road, Farmington, CA 95814</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />
      
      {/* Become a Partner Section */}
      <div className="bg-primary/5 p-8 rounded-lg max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">Become a Farm Partner</h2>
          <p className="text-muted-foreground">
            Are you a local farmer interested in partnering with Farm Fresh? We're always looking for new sustainable farms to join our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Partner Benefits</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Direct access to engaged customers</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Fair pricing and transparent policies</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Marketing support for your products</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Simplified logistics and distribution</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">How to Apply</h3>
            <p className="mb-4">
              Send us an email at <span className="text-primary font-medium">partners@farmfresh.com</span> with the following information:
            </p>
            <ul className="space-y-2 text-sm">
              <li>- Farm name and location</li>
              <li>- Types of products you grow</li>
              <li>- Your farming practices</li>
              <li>- Contact information</li>
              <li>- Any certifications (organic, etc.)</li>
            </ul>
            <Button className="mt-4">Email Us Now</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
