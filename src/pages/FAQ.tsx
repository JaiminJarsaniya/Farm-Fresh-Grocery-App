
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { faqs } from "@/lib/data";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqs);
      return;
    }

    const filtered = faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    // Auto-search as user types
    if (e.target.value.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(e.target.value.toLowerCase()) ||
          faq.answer.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  };

  return (
    <Layout>
      <SectionHeading 
        title="Frequently Asked Questions" 
        subtitle="Find answers to the most common questions about our products and services"
        centered
      />

      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No matching FAQs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all FAQs below.
            </p>
            <Button variant="outline" onClick={() => setFilteredFaqs(faqs)}>
              View All FAQs
            </Button>
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 text-center p-6 bg-primary/5 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            If you couldn't find the answer to your question, please contact our customer support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">Email Us</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
