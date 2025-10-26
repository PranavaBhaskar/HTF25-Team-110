import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What file types can I upload?',
    answer: 'You can upload text files (.txt) and PDFs. Our system extracts the text to generate your podcast script. We are working on supporting more file types in the future.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We prioritize your privacy and security. All uploaded files and generated audio are encrypted and stored securely. We never share your data with third parties.',
  },
  {
    question: 'Can I customize the podcast voice?',
    answer: 'Yes! You can choose from a variety of male and female voices, as well as different accents and styles, to find the one that works best for you.',
  },
  {
    question: 'How long can the uploaded text be?',
    answer: 'Our platform is designed to handle everything from short notes to entire textbook chapters. While there are generous limits, performance may vary for extremely large documents.',
  },
];

export function Faq() {
  return (
    <section className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center md:mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
