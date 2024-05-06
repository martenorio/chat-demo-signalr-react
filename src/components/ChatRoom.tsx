import { FC } from 'react'
import { MessageContainer } from './MessageContainer'
interface Props {
  messages: Array<{ username: string, msg: string }>
  username:string,
  listRef: React.MutableRefObject<HTMLUListElement | null>,
}
export const ChatRoom: FC<Props> = ({ messages, username, listRef }) => {
  return (
    <>
      <h3>ChatRoom</h3>
      <MessageContainer username={username} messages={messages} listRef={listRef}></MessageContainer>
    </>
  )
}
