import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div
      style={{ backgroundColor: `var(--page-background-color)` }}
      className="text-white px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Contato</h1>
        <p className="mb-8 text-center">
          Tem alguma pergunta ou sugestão? Preencha o formulário abaixo e entraremos em contato o mais breve
          possível.
        </p>
        <div className="bg-slate-900/30 p-6 rounded-lg shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;