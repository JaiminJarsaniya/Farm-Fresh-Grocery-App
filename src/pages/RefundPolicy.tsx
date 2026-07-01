
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Refund Policy"
          subtitle="Our commitment to your satisfaction and our refund procedures"
          centered
        />

        <div className="prose max-w-none">
          <h2>Our Quality Guarantee</h2>
          <p>
            At Farm Fresh, we stand behind the quality of every product we sell. Our commitment to excellence means we want you to be completely satisfied with your purchase. If, for any reason, you're not happy with the quality of the products you've received, we're here to make it right.
          </p>

          <h2>Fresh Produce Refund Policy</h2>
          <p>
            For all fresh fruits and vegetables:
          </p>
          <ul>
            <li><strong>Notify us within 24 hours</strong> of delivery if you're not satisfied with the quality of any fresh produce.</li>
            <li>Take a photo of the item to help us improve our quality control.</li>
            <li>We'll issue a full refund or store credit for the affected items, whichever you prefer.</li>
            <li>No need to return fresh produce - just dispose of or compost any unsatisfactory items.</li>
          </ul>
          <p>
            We understand that occasionally items may arrive overripe, underripe, or damaged. Our goal is to resolve these issues quickly and ensure your next order meets your expectations.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 not-prose">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please note that slight variations in size, shape, and color are natural characteristics of fresh produce and are not considered quality defects.
                </p>
              </div>
            </div>
          </div>

          <h2>Packaged Products Refund Policy</h2>
          <p>
            For dry goods, snacks, and other packaged products:
          </p>
          <ul>
            <li><strong>Unopened items</strong> can be returned within 30 days of delivery for a full refund.</li>
            <li>If a packaged item is damaged, expired, or defective, contact us within 7 days of delivery.</li>
            <li>For damaged or defective items, a photo may be requested to help us improve our quality control.</li>
            <li>Return shipping for packaged goods is covered by Farm Fresh (we'll provide a prepaid return label).</li>
          </ul>

          <h2>Subscription Box Adjustments</h2>
          <p>
            For subscription customers:
          </p>
          <ul>
            <li>If you're not satisfied with an item in your subscription box, we'll credit your account for that item toward your next delivery.</li>
            <li>You can customize future boxes to exclude items you didn't enjoy.</li>
            <li>Subscription boxes can be paused, modified, or canceled at any time before the cutoff time (48 hours before your scheduled delivery).</li>
            <li>No long-term commitment is required, and there are no cancellation fees.</li>
          </ul>

          <h2>How to Request a Refund</h2>
          <ol>
            <li><strong>Contact Customer Support</strong>: Email us at refunds@farmfresh.com or call our customer service team at (800) 123-4567.</li>
            <li><strong>Provide Order Details</strong>: Have your order number ready (found in your confirmation email or account order history).</li>
            <li><strong>Explain the Issue</strong>: Let us know which items were unsatisfactory and why.</li>
            <li><strong>Submit Photos</strong>: If possible, include photos of the products in question.</li>
            <li><strong>Choose Refund Method</strong>: Let us know if you prefer a refund to your original payment method or store credit (with a 5% bonus).</li>
          </ol>

          <h2>Refund Processing Timeline</h2>
          <ul>
            <li>Refund requests are typically processed within 1-2 business days after approval.</li>
            <li>Credit card refunds may take an additional 3-5 business days to appear on your statement, depending on your financial institution.</li>
            <li>Store credits are applied to your account immediately after processing.</li>
          </ul>

          <h2>Non-Refundable Items</h2>
          <p>
            The following items are not eligible for refund:
          </p>
          <ul>
            <li>Gift cards (except where required by law)</li>
            <li>Custom or specially ordered items that were prepared according to specifications</li>
            <li>Items marked as final sale or clearance</li>
            <li>Items that have been consumed (beyond a reasonable sample to determine quality)</li>
          </ul>

          <h2>Our Commitment to Fair Policies</h2>
          <p>
            While we trust our customers and strive to provide the most accommodating refund policy possible, we monitor refund patterns to ensure the sustainability of our generous policy. Excessive or unusual refund requests may be subject to review.
          </p>
          <p>
            Our goal is always to make things right and ensure you have a positive experience with Farm Fresh. We value your feedback, as it helps us improve our products and services.
          </p>

          <Separator className="my-8" />

          <div className="bg-primary/5 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-6 not-prose">
            <div>
              <h3 className="text-xl font-medium mb-2">Need to request a refund?</h3>
              <p className="text-muted-foreground">
                Our customer service team is ready to assist you with any quality concerns.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
              <Button variant="outline">Email Support</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
