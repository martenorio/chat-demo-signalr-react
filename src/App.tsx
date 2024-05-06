import { useEffect, useRef, useState } from 'react';
import './App.css'
import { WaitingRoom } from './components/WaitingRoom'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ChatRoom } from './components/ChatRoom';
import { SendMessageForm } from './components/SendMessageForm';

function App() {
  const [connections, setConnections] = useState<HubConnection>();
  const listRef = useRef<HTMLUListElement |null>(null);
  const [messages, setMessages] = useState<Array<{ username: string, msg: string }>>([]);
  const [username, setUsername] = useState("");
  const scrollBottom = () => {
    if (listRef.current) {
      // console.log(Object.entries(listRef.current.children))
      const element = Object.entries(listRef.current.children);
      const li =  element[element.length - 1]
      li[1].scrollIntoView();
    }
  }

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      // console.log(userName, chatRoom);
      const con = new HubConnectionBuilder().
        withUrl("http://localhost:5033/Chat").
        configureLogging(LogLevel.Information).
        build();

      // set up handler
      con.on("JoinSpecificChatRoom", (username, msg) => {
        // console.log("msg: ", msg);
        setMessages(messages => [...messages, { username, msg }])
      });

      con.on("ReceiveSpecificMessage", (username, msg) => {
        // console.log(`username: ${username}, msg: ${msg}`);
        setMessages(messages => [...messages, { username, msg }])
      });

      await con.start();
      await con.invoke("JoinSpecificChatRoom", { username: userName, chatroom: chatRoom });
      setUsername(userName);

      setConnections(con);

    } catch (error) {
      console.log(error);
    }
  }
  const sendMessages = async (message: string) => {
    // console.log("func sendMessages", message);

    try {
      await connections?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    scrollBottom();
  }, [messages])
  
  return (
    <main className='container'>
      <header>
        <h1>Binvenido al chat</h1>
        <h2>Demo chat con signalr y react</h2>
      </header>
      <div className='history-messages'>
        {
          !connections ?
            <WaitingRoom joinChatRoom={joinChatRoom} />
            :
            <ChatRoom messages={messages} username={username} listRef={listRef}/>
        }
      </div>
      {connections && <SendMessageForm sendMessage={sendMessages} />}
    </main>
  )
}

export default App
