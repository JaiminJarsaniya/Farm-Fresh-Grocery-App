
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Separator } from "@/components/ui/separator";

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Shipping Information"
          subtitle="Learn about our shipping policies, delivery areas, and what to expect"
          centered
        />

        <div className="prose max-w-none">
          <h2>Delivery Areas</h2>
          <p>
            We currently offer delivery to the following areas in California:
          </p>
          <ul>
            <li>San Francisco and the Greater Bay Area</li>
            <li>Sacramento and surrounding suburbs</li>
            <li>Los Angeles County</li>
            <li>San Diego County</li>
            <li>Central Valley (Fresno, Modesto, etc.)</li>
          </ul>
          <p>
            We're continuously expanding our delivery network. If you don't see your area listed, please enter your zip code during checkout to check availability or contact our customer service team.
          </p>

          <h2>Delivery Timeframes</h2>
          <p>
            Our delivery schedule varies by location. When placing your order, you'll be able to select from available delivery windows:
          </p>
          <ul>
            <li><strong>Morning Delivery:</strong> 7:00 AM - 12:00 PM</li>
            <li><strong>Afternoon Delivery:</strong> 12:00 PM - 5:00 PM</li>
            <li><strong>Evening Delivery:</strong> 5:00 PM - 8:00 PM (available in select areas)</li>
          </ul>
          <p>
            For subscription customers, we offer the option to set a regular delivery schedule on specific days of the week.
          </p>

          <h2>Shipping Costs</h2>
          <div className="not-prose">
            <div className="relative overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Order Value</th>
                    <th scope="col" className="px-6 py-3">Shipping Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">Orders under $30</td>
                    <td className="px-6 py-4">$7.99</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-6 py-4">Orders $30 - $50</td>
                    <td className="px-6 py-4">$5.99</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4">Orders above $50</td>
                    <td className="px-6 py-4 text-green-600 font-medium">FREE</td>
                  </tr>
                  <tr className="bg-gray-50 border-b">
                    <td className="px-6 py-4">Monthly Subscription</td>
                    <td className="px-6 py-4 text-green-600 font-medium">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h2>Packaging & Freshness</h2>
          <p>
            We take great care in packaging your products to ensure they arrive fresh and undamaged:
          </p>
          <ul>
            <li>All produce is carefully inspected before packing</li>
            <li>We use eco-friendly, compostable packaging whenever possible</li>
            <li>Temperature-sensitive items are packed with appropriate insulation</li>
            <li>Fragile items receive special protective packaging</li>
          </ul>
          <p>
            Our packaging is designed to maintain freshness for up to 24 hours after delivery, allowing some flexibility if you're not home at the exact delivery time.
          </p>

          <h2>Order Tracking</h2>
          <p>
            When your order is out for delivery, you'll receive:
          </p>
          <ul>
            <li>An email notification with your estimated delivery window</li>
            <li>SMS notifications (if you've opted in) with delivery updates</li>
            <li>Access to real-time tracking through your account page</li>
          </ul>
          <p>
            If you have any questions about your delivery, our customer service team is available to help from 8:00 AM to 8:00 PM, seven days a week.
          </p>

          <h2>Delivery Instructions</h2>
          <p>
            During checkout, you'll have the option to provide specific delivery instructions for our drivers:
          </p>
          <ul>
            <li>Preferred place to leave your order if you're not home</li>
            <li>Entry codes or gate information</li>
            <li>Landmarks to help locate your address</li>
            <li>Special instructions for apartment or office deliveries</li>
          </ul>
          <p>
            If you have recurring special requirements, you can save these instructions to your account for future orders.
          </p>

          <h2>Missed Deliveries</h2>
          <p>
            If you're not home during the delivery window:
          </p>
          <ul>
            <li>Our driver will follow the delivery instructions you provided</li>
            <li>If no instructions were provided, we'll attempt to find a safe, shaded spot to leave your order</li>
            <li>You'll receive a notification with a photo of where your order was left</li>
            <li>If the driver cannot safely leave your order, we'll contact you to arrange redelivery</li>
          </ul>
          <p>
            For perishable items that cannot be safely left, a redelivery fee may apply unless you are a subscription customer.
          </p>

          <Separator className="my-8" />

          <div className="bg-primary/5 p-6 rounded-lg not-prose">
            <h3 className="text-xl font-medium mb-3">Need Help with Your Delivery?</h3>
            <p className="text-muted-foreground mb-4">
              Our customer service team is ready to assist with any questions or concerns about your delivery.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>(800) 123-4567</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="22" y1="7" x2="13" y2="12"></line><line x1="1" y1="7" x2="10" y2="12"></line><line x1="13" y1="12" x2="22" y2="17"></line><line x1="10" y1="12" x2="1" y2="17"></line></svg>
                <span>delivery@farmfresh.com</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>8:00 AM - 8:00 PM, 7 days a week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
