import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import './FaqPage.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do I book a bicycle?',
    answer:
      'Select your start and end dates on the homepage or click "Book a Cycle" from the navigation. Browse the available cycles, select one that suits you, and complete the payment online. You\'ll receive a confirmation immediately.',
  },
  {
    question: 'Is there a security deposit?',
    answer:
      'No! We do not charge any security deposit. You only pay the rental amount for your chosen period. Full amount is to be paid before taking the bicycle.',
  },
  {
    question: 'What ID proof is required?',
    answer:
      'A valid government-issued photo ID (Aadhaar Card, Driving License, or Passport) and address proof are mandatory at the time of pickup.',
  },
  {
    question: 'Do you offer home delivery?',
    answer:
      'Yes! We offer delivery and pickup for rentals of 3 or more days. Transportation charges apply based on the distance from our store near Silk Board, Koramangala.',
  },
  {
    question: 'Can I get a refund if I cancel?',
    answer:
      'Cancellations received more than 24 hours before your rental start date are eligible for a refund. Cancellations within 24 hours of the start date will not be refunded.',
  },
  {
    question: 'What happens if the bicycle is damaged or stolen?',
    answer:
      'The customer is responsible for any damage to the bicycle or accessories during the rental period. In case of theft or loss, the full replacement amount needs to be paid.',
  },
  {
    question: 'What accessories are included with the bicycle?',
    answer:
      'Every rental includes a bell, bottle holder, lock, and helmet at no extra charge. These accessories must be returned in good condition at the end of the rental.',
  },
  {
    question: 'Can I rent multiple cycles for a group or corporate event?',
    answer:
      'Absolutely! We handle bulk bookings for corporate events, cycling trips, marathons, and team outings. Call us directly at +91 88841 70822 for group pricing and availability.',
  },
  {
    question: 'What is included in the bicycle servicing?',
    answer:
      'Our standard service includes: gear tune-up, hub checkup, headset alignment, bottom bracket checkup, brake adjustment, chain lubrication, cable lubrication, wipe clean, wheel truing, tyre pressure check, and tightening of all screws and bolts.',
  },
  {
    question: 'How long does bicycle servicing take?',
    answer:
      'A standard service is usually completed within 24–48 hours. We offer free pickup and drop from your address. If spare parts are required, the cost is charged separately at MRP.',
  },
];

const policies = [
  { icon: <CheckCircleIcon />, type: 'info', text: 'Complete rental amount must be paid before taking the bicycle.' },
  { icon: <CheckCircleIcon />, type: 'info', text: 'No security deposit is required.' },
  { icon: <CheckCircleIcon />, type: 'info', text: 'Valid photo ID and address proof are mandatory at pickup.' },
  { icon: <CheckCircleIcon />, type: 'info', text: 'Home delivery and pickup available for rentals of 3+ days (charges apply based on distance).' },
  { icon: <WarningAmberIcon />, type: 'warning', text: 'Customer is responsible for any damage to the bicycle or accessories during the rental period.' },
  { icon: <WarningAmberIcon />, type: 'warning', text: 'Full replacement value must be paid in case of theft or loss of bicycle or accessories.' },
  { icon: <WarningAmberIcon />, type: 'warning', text: 'Cancellations within 24 hours of the rental start date are non-refundable.' },
  { icon: <InfoIcon />, type: 'note', text: 'For bicycle servicing, spare parts (if required) are charged separately at MRP.' },
];

const FaqAccordion: React.FC<{ item: FaqItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle,
}) => (
  <div className={`faq-item ${isOpen ? 'open' : ''}`}>
    <button className="faq-question" onClick={onToggle}>
      <span>{item.question}</span>
      <ExpandMoreIcon className="faq-chevron" />
    </button>
    <div className="faq-answer">
      <p>{item.answer}</p>
    </div>
  </div>
);

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-page">
      {/* Header */}
      <div className="faq-page__header">
        <span className="faq-badge">Transparency First</span>
        <h1>Policies &amp; FAQ</h1>
        <p>
          Everything you need to know about renting, servicing, and riding with Cycle2Go.
          If you have more questions, we're just a call away.
        </p>
      </div>

      <div className="faq-page__body">
        {/* Policies */}
        <section className="policies-section">
          <h2 className="faq-section-title">Terms &amp; Conditions</h2>
          <div className="policies-grid">
            {policies.map((p, i) => (
              <div key={i} className={`policy-item policy-item--${p.type}`}>
                <div className="policy-item__icon">{p.icon}</div>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2 className="faq-section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((item, i) => (
              <FaqAccordion
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="faq-contact">
          <div className="faq-contact__card">
            <h3>Still have questions?</h3>
            <p>Our team is available every day, 7 AM to 8 PM. We're happy to help!</p>
            <div className="faq-contact__actions">
              <a href="tel:+918884170822" className="faq-contact__btn faq-contact__btn--phone">
                <PhoneIcon /> +91 88841 70822
              </a>
              <a href="mailto:support@gaadi2go.com" className="faq-contact__btn faq-contact__btn--email">
                <EmailIcon /> support@gaadi2go.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqPage;
