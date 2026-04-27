export type LegalSection = {
  title: string
  paragraphs: string[]
}

export type LegalPage = {
  routeName: string
  title: string
  breadcrumbLabel: string
  intro: string
  sections: LegalSection[]
}

export const legalPages: LegalPage[] = [
  {
    routeName: 'privacy-policy',
    title: 'Privacy Policy',
    breadcrumbLabel: 'Privacy Policy',
    intro:
      'This Privacy Policy describes how Dejana Truck & Utility Equipment (“Dejana,” “we,” “us,” or “our”) collects, uses, and shares information when you visit our website, create an account, or purchase products. This page is sample boilerplate for a prototype storefront and should be reviewed by qualified legal counsel before production use.',
    sections: [
      {
        title: 'Information we collect',
        paragraphs: [
          'We may collect identifiers you provide directly, such as name, email address, phone number, billing and shipping addresses, and payment method details (processed by our payment partners—we do not store full card numbers on our servers in typical configurations).',
          'We automatically collect certain device and usage information, including IP address, browser type, operating system, referring URLs, pages viewed, and approximate location derived from IP.',
          'If you contact support or submit forms, we retain the content of those communications to respond to you and improve our services.',
        ],
      },
      {
        title: 'How we use information',
        paragraphs: [
          'We use the information above to process and fulfill orders, communicate about transactions and shipping, provide customer support, detect fraud and abuse, analyze site traffic and product interest, and comply with legal obligations.',
          'With your consent where required, we may send marketing emails about products, promotions, and restocks. You can opt out at any time using the link in those messages.',
        ],
      },
      {
        title: 'Sharing and disclosure',
        paragraphs: [
          'We share information with service providers who assist us with hosting, analytics, payment processing, shipping carriers, and email delivery. They are contractually limited to using data only for those purposes.',
          'We may disclose information if required by law, to protect our rights or the safety of others, or as part of a merger, acquisition, or sale of assets (with notice where applicable).',
        ],
      },
      {
        title: 'Cookies and similar technologies',
        paragraphs: [
          'We use cookies and similar technologies to remember your preferences, keep you signed in, measure site performance, and support advertising partners where enabled. You can control cookies through your browser settings; disabling cookies may limit certain features.',
        ],
      },
      {
        title: 'Data retention and security',
        paragraphs: [
          'We retain information as long as needed for the purposes described above, including satisfying legal, accounting, and reporting requirements. Retention periods vary by data type.',
          'We implement administrative, technical, and physical safeguards designed to protect personal information. No method of transmission over the Internet is completely secure.',
        ],
      },
      {
        title: 'Your choices and rights',
        paragraphs: [
          'Depending on where you live, you may have rights to access, correct, delete, or export your personal information, or to object to or restrict certain processing. Contact us using the details on our website to exercise these rights.',
        ],
      },
      {
        title: 'Children',
        paragraphs: [
          'Our services are not directed to children under 16, and we do not knowingly collect personal information from children.',
        ],
      },
      {
        title: 'Changes to this policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. We will post the revised version on this page and update the “Last updated” date when changes are material.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: [
          'For privacy-related questions, please contact us through the customer service channels listed on our website.',
        ],
      },
    ],
  },
  {
    routeName: 'terms-and-conditions',
    title: 'Terms & Conditions',
    breadcrumbLabel: 'Terms & Conditions',
    intro:
      'These Terms & Conditions (“Terms”) govern your access to and use of this website and related services operated by Dejana Truck & Utility Equipment. By using the site, you agree to these Terms. This document is illustrative boilerplate only.',
    sections: [
      {
        title: 'Eligibility and accounts',
        paragraphs: [
          'You must be at least the age of majority in your jurisdiction to make purchases. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.',
        ],
      },
      {
        title: 'Products, pricing, and availability',
        paragraphs: [
          'We strive to display accurate descriptions, specifications, and pricing; however, errors may occur. We reserve the right to correct errors, cancel orders affected by manifest pricing mistakes, and limit quantities.',
          'Product images are representative. Actual equipment, finishes, or included accessories may vary. Heavy or oversized items may require freight quoting before checkout.',
        ],
      },
      {
        title: 'Orders and payment',
        paragraphs: [
          'Submitting an order constitutes an offer to purchase. We may accept or decline orders for any reason, including product availability or concerns about fraud.',
          'Payment is processed at the time of order or according to the payment terms shown at checkout. You authorize us and our payment processors to charge your selected payment method.',
        ],
      },
      {
        title: 'Shipping and title',
        paragraphs: [
          'Shipping terms, estimated delivery windows, and carrier selection are described in our Shipping Policy. Risk of loss passes in accordance with that policy and the carrier’s terms.',
        ],
      },
      {
        title: 'Returns and warranties',
        paragraphs: [
          'Returns and refunds are governed by our Returns Policy and by any manufacturer warranty applicable to the product. Warranty service may be provided directly by the manufacturer or through Dejana as stated on the product page.',
        ],
      },
      {
        title: 'Prohibited conduct',
        paragraphs: [
          'You agree not to misuse the site, including by attempting to gain unauthorized access, scraping in violation of our rules, interfering with security features, or using the site for unlawful purposes.',
        ],
      },
      {
        title: 'Intellectual property',
        paragraphs: [
          'All content on this site—including text, graphics, logos, and software—is owned by Dejana or its licensors and is protected by intellectual property laws. You may not copy or exploit it without permission except as allowed for normal browsing and personal reference.',
        ],
      },
      {
        title: 'Disclaimer of warranties',
        paragraphs: [
          'Except where prohibited by law, the site and products are provided “as is” and “as available” without warranties of any kind, whether express or implied, including implied warranties of merchantability or fitness for a particular purpose.',
        ],
      },
      {
        title: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, Dejana shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits or data, arising from your use of the site or products.',
        ],
      },
      {
        title: 'Governing law and disputes',
        paragraphs: [
          'These Terms are governed by the laws of the jurisdiction specified in your commercial agreement with us, or otherwise by the laws applicable to Dejana’s principal place of business, without regard to conflict-of-law rules. Courts in that jurisdiction shall have exclusive venue unless a different mandatory forum applies.',
        ],
      },
      {
        title: 'Changes',
        paragraphs: [
          'We may modify these Terms at any time. Continued use of the site after changes constitutes acceptance of the revised Terms.',
        ],
      },
    ],
  },
  {
    routeName: 'shipping-policy',
    title: 'Shipping Policy',
    breadcrumbLabel: 'Shipping Policy',
    intro:
      'This Shipping Policy explains how Dejana Truck & Utility Equipment ships orders, estimates delivery times, and handles freight for heavy equipment. Details below are sample boilerplate for demonstration.',
    sections: [
      {
        title: 'Processing time',
        paragraphs: [
          'Most in-stock orders are processed within 1–2 business days after payment confirmation. Custom-configured items, built-to-order products, or items awaiting manufacturer release may require additional lead time shown on the product page or order confirmation.',
        ],
      },
      {
        title: 'Shipping methods',
        paragraphs: [
          'We ship via common carriers (for example, parcel services for smaller parts and accessories) and, where applicable, LTL or dedicated freight for large truck bodies, racks, and similar equipment.',
          'Available methods and rates are presented at checkout based on item weight, dimensions, destination, and carrier capacity.',
        ],
      },
      {
        title: 'Delivery estimates',
        paragraphs: [
          'Estimated delivery dates are not guaranteed; they depend on carrier performance, weather, and customs or regulatory delays where relevant. Tracking information is emailed when your order ships.',
        ],
      },
      {
        title: 'Freight and curbside delivery',
        paragraphs: [
          'Freight shipments are typically curbside delivery unless you purchase liftgate or inside delivery services where offered. You are responsible for unloading unless otherwise contracted. Inspect freight for visible damage before signing the delivery receipt.',
        ],
      },
      {
        title: 'Shipping restrictions',
        paragraphs: [
          'Certain hazardous materials, oversized loads, or regulated items may be restricted to specific regions or require special documentation. We will notify you if we cannot ship to your location.',
        ],
      },
      {
        title: 'International orders',
        paragraphs: [
          'If international shipping is offered, you may be responsible for duties, taxes, brokerage fees, and compliance with import laws in your country. Delivery times may be longer than domestic estimates.',
        ],
      },
      {
        title: 'Address accuracy',
        paragraphs: [
          'Please verify your shipping address before submitting your order. Additional charges may apply for address corrections or reshipment due to incorrect information provided by the customer.',
        ],
      },
      {
        title: 'Questions',
        paragraphs: [
          'For shipping quotes on large orders or dealer dock deliveries, contact our parts and logistics team using the phone or email listed on our website.',
        ],
      },
    ],
  },
  {
    routeName: 'returns-policy',
    title: 'Returns Policy',
    breadcrumbLabel: 'Returns Policy',
    intro:
      'This Returns Policy outlines eligibility, time windows, and procedures for returning products purchased from Dejana Truck & Utility Equipment. It is sample content for a prototype and may not reflect final commercial terms.',
    sections: [
      {
        title: 'General eligibility',
        paragraphs: [
          'We want you to be satisfied with your purchase. Many new, unused items in original packaging may be returned within the window stated at checkout or on your packing slip, subject to the exclusions below.',
        ],
      },
      {
        title: 'Non-returnable items',
        paragraphs: [
          'For safety and regulatory reasons, certain items may not be returnable once opened or installed, including electrical components, cut-to-length materials, and custom-built or special-order equipment.',
          'Items marked “final sale,” clearance, or “built to order” on the product page are generally not eligible for return unless defective as covered by warranty.',
        ],
      },
      {
        title: 'Return window',
        paragraphs: [
          'Unless otherwise stated, eligible items may be returned within 30 days of delivery for a refund to the original payment method, less any restocking fees described below. The return must be initiated before the window closes.',
        ],
      },
      {
        title: 'Condition of returned goods',
        paragraphs: [
          'Returned products must be in resalable condition, with all original packaging, manuals, hardware, and accessories. We may deny or partially refund returns that show signs of installation, abuse, or missing components.',
        ],
      },
      {
        title: 'Restocking fees',
        paragraphs: [
          'Large or heavy items, opened kits, or products requiring inspection and repackaging may be subject to a restocking fee. Any fee will be disclosed during the return authorization process when applicable.',
        ],
      },
      {
        title: 'How to start a return',
        paragraphs: [
          'Contact customer service with your order number and the items you wish to return. We will provide a Return Merchandise Authorization (RMA) number and return instructions. Returns sent without an RMA may be delayed or refused.',
        ],
      },
      {
        title: 'Return shipping',
        paragraphs: [
          'Unless the return is due to our error or a defective product covered under warranty, you are responsible for return shipping costs. For freight returns, we can assist in scheduling carrier pickup; charges may be deducted from your refund.',
        ],
      },
      {
        title: 'Refunds',
        paragraphs: [
          'After we receive and inspect your return, refunds are typically processed within 5–10 business days. Depending on your financial institution, posted credits may take additional time to appear on your statement.',
        ],
      },
      {
        title: 'Exchanges',
        paragraphs: [
          'Exchanges are handled as a return plus a new order when inventory allows. Our team can help you place a replacement order to minimize downtime for your fleet or shop.',
        ],
      },
      {
        title: 'Damaged or incorrect shipments',
        paragraphs: [
          'If your order arrives damaged or incorrect, photograph the packaging and product and contact us within 48 hours of delivery. We will work with you and the carrier on a replacement, repair, or refund as appropriate.',
        ],
      },
    ],
  },
]

const byRouteName: Record<string, LegalPage> = Object.fromEntries(
  legalPages.map((p) => [p.routeName, p]),
)

export function getLegalPage(routeName: string | symbol | undefined | null): LegalPage | undefined {
  if (routeName == null || typeof routeName !== 'string') return undefined
  return byRouteName[routeName]
}
