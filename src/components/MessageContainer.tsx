import { FC } from 'react'
import "./../css/MessageContainer.css";
interface Props {
  messages: Array<{ username: string, msg: string }>
  username: string,
  listRef: React.MutableRefObject<HTMLUListElement | null>,
}

export const MessageContainer: FC<Props> = ({ messages, username, listRef }) => {
  // const listRef = useRef<HTMLUListElement |null>(null);
  return (
    <div className='container-messages' >
      <ul ref={listRef}>
        {
          messages.map((m, i) => (
            <li className={username === m.username ? 'my-message' : 'message'} id={`${i}`} key={i}>
              <div className='content-message'>
              {m.username} : {m.msg}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
