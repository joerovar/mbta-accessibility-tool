import "./App.css";

import QueryBox from "./components/QueryBox";
import QueryForm from "./components/QueryForm";
import ParkingQueryForm from "./components/ParkingQueryForm";
import ChatRoom from "./components/ChatRoom";
import TravelChatRoom from "./components/TravelChatRoom";
import useImage from "./hooks/useImage";
import useText from "./hooks/useText";
import { useEffect } from "react";
import ImageCaptionDisplay from "./components/ImageCaptionDisplay";

function App() {
  // const { image, imgError, imgIsLoading } = useImage("");
  // const { text, textError, textIsLoading } = useText("", "chatroom-image");

  // useEffect(() => {
  //   console.log(text);
  // }, [text]);

  return (
    <div>
      {/* {(imgIsLoading || textIsLoading) && <div className="spinner-border" />}
      {!imgIsLoading && !textIsLoading && (
        <ImageCaptionDisplay img={image} caption={text} />
      )} */}
      <br />
      <h1>Accessible Journey Assistant</h1>
      {/* <br />
      <QueryBox />
      <br /> */}
      {/* <ParkingQueryForm /> */}
      {/* <br />
      <QueryForm /> */}
      <br />
      {/* <ChatRoom /> */}
      <TravelChatRoom />
      <br />
    </div>
  );
}

export default App;

/**
 * <QueryForm />
      <br />
      <ChatRoom />
 */
