import { useForm } from 'react-hook-form';

import { HubConnection } from '@microsoft/signalr';

type SendMessageInputValue = {
  content: string;
};
type SendMessageFormprops = {
  username: string;
  connection: HubConnection | undefined;
};
const SendMessageForm = ({ username, connection }: SendMessageFormprops) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SendMessageInputValue>();

  const sendMessageHandler = async (data: SendMessageInputValue) => {
    if (connection) {
      connection?.invoke('SendMessage', {
        recipientUsername: username,
        content: data.content,
      });
      reset();
    }
  };
  return (
    <>
      <p className="text-center text-red-500">{errors.content?.message}</p>
      <form
        className="flex items-center"
        // onSubmit={sendMessageHandler}
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
