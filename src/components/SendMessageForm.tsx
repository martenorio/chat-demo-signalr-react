import React, { FC, useState } from 'react'
import SendIcon from "./../assets/send-svgrepo-com.svg";
import "./../css/SendMessageForm.css";
interface Props {
  sendMessage: (message: string) => void
}

export const SendMessageForm: FC<Props> = ({ sendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    sendMessage(message);
    setMessage("");
  }
  return (
    <div className='form-container'>
      <form className='form-send-message' onSubmit={handleSubmit}>
        <input
          type="text"
          name="Chat"
          id="ChatID"
          placeholder='Escribe tu mensaje aquí'
          className='input-message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='btn-send-message' disabled={!message}>
          <img src={SendIcon} alt="Send Icon" width={"30px"} />
        </button>
      </form>
    </div>
  )
}
