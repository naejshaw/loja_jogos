import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  email: string;
}

const MailingListForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Subscribing to mailing list with data:', data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-500">Inscrito!</h2>
        <p>Obrigado por se inscrever na nossa mailing list.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <input
          type="text"
          placeholder="NOME"
          {...register('name', {
            required: 'O nome é obrigatório',
          })}
          className="w-full rounded-md bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="ENDEREÇO DE E-MAIL"
          {...register('email', {
            required: 'O e-mail é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Endereço de e-mail inválido',
            },
          })}
          className="w-full rounded-md bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
      </div>
      <button
        type="submit"
        className="rounded-md bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
      >
        INSCREVA-SE AGORA
      </button>
    </form>
  );
};

export default MailingListForm;
