import { useForm } from 'react-hook-form';
import { useCreateMessageMutation } from '../api/messagesApi';

type SendMessageInputValue = {
  content: string;
};
type SendMessageFormprops = {
  username: string;
};
const SendMessageForm = ({ username }: SendMessageFormprops) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SendMessageInputValue>();

  const [createMessage] = useCreateMessageMutation();
  const sendMessageHandler = (data: SendMessageInputValue) => {
    createMessage({ content: data.content, recipientUsername: username })
      .unwrap()
      .then((data) => {
        if (data) {
          reset();
        }
      });
  };
  return (
    <>
      <p className="text-center text-red-500">{errors.content?.message}</p>
      <form
        className="flex items-center"
        onSubmit={handleSubmit(sendMessageHandler)}
      >
        <input
          className="py-1 px-2 w-full outline-none border-slate-300 placeholder:italic rounded"
          type="text"
          {...register('content', {
            required: {
              value: true,
              message: 'Cant send empty message',
            },
          })}
          id=""
          placeholder="Send a private message"
        />
        <button
          disabled={!isValid}
          className=" border bg-orange-600 text-white rounded py-1 px-5 border-orange-600 hover:bg-white hover:text-orange-600 duration-200 disabled:opacity-50"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default SendMessageForm;
