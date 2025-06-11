import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What is GovernorHaus and how does it work?",
    answer:
      "GovernorHaus is a powerful and intuitive DAO launcher designed to help you create and manage Decentralized Autonomous Organizations (DAOs) easily. It uses OpenZeppelin Governor contracts, which are well-known for their reliability and security. With GovernorHaus, you can create a DAO without any coding knowledge, directly from your browser. The platform guides you step-by-step, from defining your DAO's name and governance parameters to deploying it on the blockchain. Once deployed, your DAO is automatically integrated with Tally.xyz, enabling easy governance management.",
    value: "item-1",
  },
  {
    question: "What is Tally, and how is GovernorHaus integrated with it?",
    answer:
      "Tally is a user-friendly governance platform for DAOs that allows communities to view, manage, and participate in DAO governance seamlessly. While Tally excels as a governance interface, it does not include a native launcher for creating DAOs. This is where GovernorHaus comes in—it provides the creation mechanism that Tally lacks. Once a DAO is launched with GovernorHaus, it is automatically integrated with Tally, allowing DAO members to create and vote on proposals, track DAO activities, and manage governance without any technical barriers.",
    value: "item-2",
  },
  {
    question: "How secure are the contracts used by GovernorHaus?",
    answer:
      "GovernorHaus utilizes OpenZeppelin contracts, which are some of the most secure and trusted smart contracts in the blockchain ecosystem. OpenZeppelin's contracts have been heavily audited and are widely adopted by leading blockchain projects, ensuring that your DAO's foundational components are safe and reliable. Security is a top priority for GovernorHaus, and by using these proven contracts, we ensure that your DAO operates with minimal risk.",
    value: "item-3",
  },
  {
    question:
      "Can I import token holders from an existing list or spreadsheet?",
    answer:
      "Yes, GovernorHaus makes it easy to import token holders by allowing you to paste addresses and token allocations directly from a CSV, Excel, or Google Sheets document. This bulk import functionality simplifies the process of distributing governance tokens, especially when dealing with a large number of participants, saving you time and effort.",
    value: "item-4",
  },
  {
    question: "Are there any fees involved in deploying a DAO?",
    answer:
      "The only cost involved in deploying a DAO using GovernorHaus is the blockchain network fee (also known as the gas fee). This fee is required to pay for the transaction on the blockchain. GovernorHaus itself does not charge any additional fees, ensuring that you only pay for what is absolutely necessary to get your DAO live.",
    value: "item-5",
  },
  {
    question: "Which blockchain networks does GovernorHaus support?",
    answer:
      "GovernorHaus currently supports deployment on the Optimism, Celo, Arbitrum, Base, Gnosis, and Polygon networks, which are compatible with Ethereum and offer lower transaction costs. We are also open to expanding support for other blockchain networks based on user demand. If you have a specific network in mind, feel free to reach out to us with your request.",
    value: "item-6",
  },
  {
    question:
      "Can I customize the DAO's governance parameters after the deployment?",
    answer:
      "Yes, the governance parameters of your DAO can be modified even after deployment. This can be done through a proposal that members vote on. By submitting and passing proposals, you can adjust parameters like voting duration, quorum thresholds, and more, ensuring that your DAO governance can evolve as your community grows and changes.",
    value: "item-7",
  },
  {
    question: "How do I manage my DAO after deployment?",
    answer:
      "Once your DAO is deployed, you can manage it through Tally.xyz. Tally provides a user-friendly interface where you can create proposals, conduct votes, manage the DAO's funds, and keep track of all governance activities. Tally makes it easy for both DAO administrators and community members to actively participate in the decision-making process, ensuring transparent and decentralized governance.",
    value: "item-8",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="https://blossom.software"
          target="_blank"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
