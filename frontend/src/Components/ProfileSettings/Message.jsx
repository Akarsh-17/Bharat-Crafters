import React, { useEffect, useRef, useState } from 'react'
import './message.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineSend} from 'react-icons/ai'
import { TfiGallery } from "react-icons/tfi";
import styles from './style'
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })


const Message = () => {
  const buyer=useSelector((state)=>state.CurrentUser.CurrentUser)
  const [conversation,setConversation]=useState([])
  const [open,setOpen]=useState(false)
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage,setNewMessage]=useState("")
  const [seller,setSeller]=useState(null)
  const [onlineSellers,setOnlineSellers]=useState([])
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(()=>{
   axios.get(`http://localhost:4000/api/v1/conversation/get-buyer-conversation`,{withCredentials:true})
   .then((res)=>{
    console.log(res)
    setConversation(res?.data?.conversation)
   })
   .catch((error)=>{
    console.log(error)
   })
   
  },[buyer])
  
  
  useEffect(()=>{
   if(buyer)
    {
      const buyerId=buyer?._id
      socketId.emit("addUser",buyerId)
      socketId.on("getUsers",(data)=>{
        setOnlineSellers(data)
      })
    }
  },[buyer])

  const onlineCheck=(chat)=>{
    const chatMembers=chat.members.find((member)=>member !=buyer?._id)
    const online=onlineSellers.find((user)=>user.userId===chatMembers)
    return online?true :false
  }

  useEffect(() => {
    const getMessage = async () => {
      try {
        const id = currentChat?._id;
        const response = await axios.get(`http://localhost:4000/api/v1/conversation/buyer-getAllMessages/${id}`,{withCredentials:true})
        console.log(" h1 ",response)
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: buyer._id,
    });
    const id = currentChat._id;
    await axios
      .put(
        `http://localhost:4000/api/v1/conversation/get-buyer-updatedLastMessage/${id}`,
        {
          lastMessage: newMessage,
          lastMessageId: buyer._id,
        },
        { withCredentials: true }
      )
    .then((res) => {
      console.log(res.data.conversation);
      setNewMessage("");
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: buyer?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== buyer?._id
    );
        
    socketId.emit("sendMessage", {
      senderId: buyer._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`http://localhost:4000/api/v1/conversation/buyer-createNewMessage`,message,{withCredentials:true})
          .then((res) => {
            console.log(res)
            setMessages([...messages, res?.data?.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(currentChat,"jjjj")

  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== buyer._id
    );

    socketId.emit("sendMessage", {
      senderId: buyer._id,
      receiverId,
      images: e,
    });

    try {
      await axios
      .post(`http://localhost:4000/api/v1/conversation/buyer-createNewMessage`, {
          images: e,
          sender: buyer._id,
          text: newMessage,
          conversationId: currentChat._id,
        },{withCredentials:true})
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    const id = currentChat._id;
    await axios
      .put(
        `http://localhost:4000/api/v1/conversation/get-buyer-updatedLastMessage/${id}`,
      {
        lastMessage: "Photo",
        lastMessageId: buyer._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);


  return (
    <div className="message-component-container">
      {!open && (
        <>
          <h1 className="message-container-heading">All Messages</h1>
          {/* all messages list  */}
          {conversation &&
            conversation.map((item, index) => (
              <Messagelist
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={buyer._id}
                setSeller={setSeller}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          buyerId={buyer?._id}
          seller={seller}
          scrollRef={scrollRef}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

const Messagelist = ({ data, index, setOpen, setCurrentChat,me,setSeller,online,setActiveStatus}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  useEffect(()=>{
    setActiveStatus(online)
    const userId=data.members.find((user)=>user!=me)

    const getSeller=async()=>{
      try{
         const res=await axios.get(`http://localhost:4000/api/v1/conversation/sellerInfo/${userId}`,{withCredentials:true})
         setUser(res.data.user)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getSeller()
  },[me,data])
  return (
    <div
      class={`message-person-outer-container ${active === index ? 'bg-active' : 'bg-inactive'}`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data) || setSeller(user) || setActiveStatus(online)
      }
    >
      <div className='person-profile-pic-container'>
        <img src={user?.image} className="person-profile-pic" />
        {online ? (
          <div className=" small-green-dot" />
        ) : (
          <div className="small-gray-dot" />
        )}
      </div>
      <div className='message-person-name-container'>
        <h1 className="message-person-name" >
          {user?.firstName+ " " + user?.lastName}
        </h1>
        <p className="last-message-by">
          {
            data?.lastMessageId!==user?._id ?"You: " :user?.firstName+": "
          }
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({  
  scrollRef,
  setOpen,
  setNewMessage,
  newMessage,
  sendMessageHandler,
  messages,
  buyerId,
  seller,
  activeStatus,
  handleImageUpload

}) => {
  const navigate=useNavigate()
  return (
    <div className="chat-outer-container">
      <div className="chat-header-container">
      <AiOutlineArrowLeft
          size={23}
          style={{ cursor: 'pointer' , marginRight: "10px"}}
          onClick={() => {setOpen(false) 
            navigate("/settings/messages")}}
        />
        <div className="chat-name-container" >
          <img src={seller?.image} alt="" className="person-profile-pic" />
          <div className='message-person-name-container'>
            <h1 className="message-person-name">{seller?.firstName+ " " +seller?.lastName}</h1>
            <h1 className="last-message-by">{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
       
      </div>

      {/* messages */}
      <div className="main-chat-container">
        {messages &&
          messages.map((item, index) => (
            <div
            key={index}
            className={`message-container ${item.sender === buyerId ? "message-container-justify-end" : ""}`}
            ref={scrollRef}
            >
              {item.sender !== buyerId && (
                <img
                  src={seller.image}
                  className=" circle-icon"
                  alt=""
                />
              )}
              {item.images && (
                  <img
                    src={`${item.images?.url}`}
                    alt='image'
                    class="custom-image"
                  />
                )}
              <div>
                <div className="message-background">
                {item.text}
                </div>
                <p className="message-send-timing">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      <form
        aria-required={true}
        className='chat-input-container'
        onSubmit={sendMessageHandler}
      >
        <div >
          <input
            type="file"
            name=""
            id="image"
            style={{ display: 'none' }}
            className='image-upload-container'
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery style={{ cursor: 'pointer' }} size={20} />
          </label>
        </div>
        <div className='message-typing-input-container'>
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-typing-input"
          />
          {/* <input type="submit" value="Send" style={{ display: 'none' }} id="send" /> */}
          <AiOutlineSend
              size={20}
              className="message-send-icon"
            />
        </div>

      </form>
    </div>
  );
};
export default Message
