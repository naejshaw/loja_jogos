import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Sending data to team@sensengames.com:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-500">Mensagem Enviada!</h2>
        <p>Obrigado por entrar em contato. Retornaremos em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nome
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'O nome é obrigatório' })}
          className="w-full rounded-md bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'O e-mail é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Endereço de e-mail inválido',
            },
          })}
          className="w-full rounded-md bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', { required: 'A mensagem é obrigatória' })}
          className="w-full rounded-md bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && <p className="mt-1 text-red-500">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
      >
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;
