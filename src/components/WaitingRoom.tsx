import React, { FC, useState } from 'react'
import "./../css/WaitingRoom.css"
interface Props {
  joinChatRoom: (userName: string, chatRoom: string) => void
}
export const WaitingRoom: FC<Props> = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<string>("");
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!userName || !chatRoom) return;
    joinChatRoom(userName, chatRoom);
  }
  return (
    <>
      <form className='my-login-chat' onSubmit={handleSubmit}>
        <input
          type="text"
          name="UserName"
          id="UserNameID"
          placeholder='usuario'
          className='input-text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          name="ChatRoom"
          id="ChatRoomID"
          placeholder='chatroom'
          className='input-text'
          value={chatRoom}
          onChange={(e) => setChatRoom(e.target.value)}
        />
        <button className='btn' type='submit'>
          Unirse a chat
        </button>
      </form>
    </>
  )
}
