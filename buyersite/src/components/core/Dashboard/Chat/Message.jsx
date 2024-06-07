import React, { useEffect, useRef, useState } from 'react'
import logo from '../../../../images/logo9.png'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {AiOutlineSend} from 'react-icons/ai'
import { TfiGallery } from "react-icons/tfi";
import styles from './styles'
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })


const Message = () => {
  const seller=useSelector((state)=>state.auth.currentUser)
  const [conversation,setConversation]=useState([])
  const [open,setOpen]=useState(false)
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage,setNewMessage]=useState("")
  const [buyer,setBuyer]=useState(null)
  const [onlinebuyers,setOnlineBuyers]=useState([])
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
   axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/conversation/get-seller-conversation`,{withCredentials:true})
   .then((res)=>{
    console.log(res)
    setConversation(res?.data?.conversation)
   })
   .catch((error)=>{
    console.log(error)
   })
   
  },[seller])
  
  
  useEffect(()=>{
   if(seller)
    {
      const sellerId=seller?._id
      socketId.emit("addUser",sellerId)
      socketId.on("getUsers",(data)=>{
        setOnlineBuyers(data)
      })
    }
  },[seller])

  const onlineCheck=(chat)=>{
    const chatMembers=chat.members.find((member)=>member !=seller?._id)
    const online=onlinebuyers.find((user)=>user.userId===chatMembers)
    return online?true :false
  }

  useEffect(() => {
    const getMessage = async () => {
      try {
        const id = currentChat?._id;
        const response = await axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/conversation/seller-getAllMessages/${id}`,{withCredentials:true})
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
      lastMessageId: seller._id,
    });
    const id = currentChat._id;
    await axios
      .put(
        `https://bharat-crafters-backend.onrender.com/api/v1/conversation/get-seller-updatedLastMessage/${id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
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
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`https://bharat-crafters-backend.onrender.com/api/v1/conversation/seller-createNewMessage`,message,{withCredentials:true})
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
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
      .post(`https://bharat-crafters-backend.onrender.com/api/v1/conversation/seller-createNewMessage`, {
          images: e,
          sender: seller._id,
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
        `https://bharat-crafters-backend.onrender.com/api/v1/conversation/get-seller-updatedLastMessage/${id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);


  // console.log(currentChat,"jjjj")

  return (
    <div className="w-[90%] bg-white h-screen rounded">
      {!open && (
        <>
          <h1 className="text-center text-2xl py-3">All Messages</h1>
          {/* all messages list  */}
          {conversation &&
            conversation.map((item, index) => (
              <Messagelist
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setBuyer={setBuyer}
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
          sellerId={seller?._id}
          buyer={buyer}
          scrollRef={scrollRef}
          activeStatus={activeStatus}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
}

const Messagelist = ({ data, index, setOpen, setCurrentChat,me,setBuyer,online,setActiveStatus}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  useEffect(()=>{
    setActiveStatus(online)
    const userId=data.members.find((user)=>user!==me)

    const getBuyer=async()=>{
      try{
         const res=await axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/conversation/byerInfo/${userId}`,{withCredentials:true})
         setUser(res.data.user)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getBuyer()
  },[me,data])
  return (
    <div
      className={`w-full flex  p-2 ${
        active === index ?"bg-[#00000010]" : "bg-transparent"
      } cursor-pointer `}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data) || setBuyer(user) || setActiveStatus(online)
      }
    >
      <div className="relative">
        <img src={user?.image} className="w-[50px] h-[50px] rounded-full" />
        {online ? (
          <div className=" w-3 h-3 bg-caribbeangreen-200 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-3 h-3 bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
      </div>
      <div className="pl-3 ">
        <h1 className="text-lg">
          {user?.firstName+ " " + user?.lastName}
        </h1>
        <p className="text-sm ">
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
  setOpen,
  scrollRef,
  setNewMessage,
  newMessage,
  sendMessageHandler,
  messages,
  sellerId,
  buyer,
  activeStatus,
  handleImageUpload
}) => {
  const navigate=useNavigate()
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex p-3 items-center justify-between bg-pure-greys-100">
        <div className="flex">
          <img src={buyer?.image} alt="" className="w-[60px] h-[60px] rounded-full" />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{buyer?.firstName+ " " +buyer?.lastName}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => {setOpen(false) 
            navigate("/dashboard/messages")}}
        />
      </div>

      {/* messages */}
      <div className="px-3 h-[80vh] overflow-y-scroll">
        {messages &&
          messages.map((item, index) => (
            <div
            key={index}
            className={`flex w-full my-2 ${
              item.sender === sellerId ? "justify-end" : "justify-start"
            }`}
            ref={scrollRef}
            >
              {item.sender !== sellerId && (
                <img
                  src={buyer.image}
                  className=" w-10 h-10 rounded-full mr-3"
                  alt=""
                />
              )}
              {item.images && (
                  <img
                    src={`${item.images?.url}`}
                    className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                  />
                )}
              <div>
                <div className=" bg-richblack-25 h-min w-max p-2  rounded">
                  <p>{item.text}</p>
                </div>
                <p className=" text-xs font text-[#000000d3] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
export default Message
