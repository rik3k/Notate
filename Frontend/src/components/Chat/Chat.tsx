import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { StreamingMessage } from "./ChatComponents/StreamingMessage";
import { ChatMessage } from "./ChatComponents/ChatMessage";
import { ChatInput } from "./ChatComponents/ChatInput";
import { LoadingIndicator } from "./ChatComponents/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/useUser";
import { IngestProgress } from "@/components/CollectionModals/CollectionComponents/IngestProgress";
import logo from "@/assets/icon.png";
import { useSysSettings } from "@/context/useSysSettings";
import { useView } from "@/context/useView";
import { NewConvoWelcome } from "./ChatComponents/NewConvoWelcome";

export default function Chat() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);

  const {
    handleResetChat: originalHandleResetChat,
    isLoading,
    setIsLoading,
    streamingMessage,
    setStreamingMessage,
    activeUser,
    messages,
    setMessages,
    error,
  } = useUser();
  const { setActiveView } = useView();

  const { localModalLoading } = useSysSettings();

  const handleResetChat = async () => {
    await originalHandleResetChat();
    setResetCounter((c) => c + 1);
  };

  // This aids in the auto scroll to the bottom of the chat when a new message is sent
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollElement && isAtBottom) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    };

    if (isAtBottom) {
      scrollToBottom();
      const timeoutId = setTimeout(scrollToBottom, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isAtBottom]);

  // This aids in the breaking of the auto scroll when the user is scrolling up
  useEffect(() => {
    const scrollElement = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );

    const handleScroll = () => {
      if (scrollElement) {
        const isBottom =
          Math.abs(
            scrollElement.scrollHeight -
              scrollElement.clientHeight -
              scrollElement.scrollTop
          ) < 10;
        setIsAtBottom(isBottom);
      }
    };

    scrollElement?.addEventListener("scroll", handleScroll);
    return () => scrollElement?.removeEventListener("scroll", handleScroll);
  }, []);

  // This signals to the backend that the user is streaming a message and updates the UI
  useEffect(() => {
    let newMessage: string = "";
    let isSubscribed = true; // Add a flag to prevent updates after unmount

    const handleMessageChunk = (chunk: string) => {
      if (!isSubscribed) return; // Skip if component is unmounted
      newMessage += chunk;
      setStreamingMessage(newMessage);
    };

    const handleStreamEnd = () => {
      if (!isSubscribed) return; // Skip if component is unmounted
      setStreamingMessage("");
      newMessage = "";
      setIsLoading(false);
    };

    // Remove any existing listeners before adding new ones
    window.electron.offMessageChunk(handleMessageChunk);
    window.electron.offStreamEnd(handleStreamEnd);

    // Add new listeners
    window.electron.onMessageChunk(handleMessageChunk);
    window.electron.onStreamEnd(handleStreamEnd);

    return () => {
      isSubscribed = false; // Set flag to prevent updates after unmount
      // Clean up listeners
      window.electron.offMessageChunk(handleMessageChunk);
      window.electron.offStreamEnd(handleStreamEnd);
    };
  }, [setIsLoading, setMessages, setStreamingMessage]);

  useEffect(() => {
    if (!activeUser) {
      setActiveView("SelectAccount");
    }
  }, [activeUser, setActiveView]);

  return (
    <div className="pt-5 h-[calc(100vh-1rem)] flex flex-col">
      <div className={`flex flex-col h-full overflow-hidden`}>
        <div className="p-2 bg-secondary/50 border-b border-secondary flex items-center">
          <div className="flex items-center flex-1">
            <img src={logo} alt="logo" className="h-6 w-6 mr-2" />

            <h1 className="text-2xl font-bold">Notate</h1>
          </div>
          <div className="flex-1 flex justify-center">
            {localModalLoading && (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Loading local model...</span>
              </div>
            )}
            <IngestProgress truncate={true} />
          </div>
          <div className="flex-1 flex justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                handleResetChat();
              }}
            >
              <PlusCircle className="mr-2" /> New Chat
            </Button>
          </div>
        </div>

        <ScrollArea
          ref={scrollAreaRef}
          className={`flex-grow px-4`}
          style={{ height: "calc(100% - 8rem)" }}
        >
          {" "}
          {messages.length === 0 && <NewConvoWelcome key={resetCounter} />}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "user" ? "user-message" : "ai-message"
              }`}
              data-testid={`chat-message-${message.role}`}
            >
              <ChatMessage message={message} formatDate={formatDate} />
            </div>
          ))}
          {streamingMessage && <StreamingMessage content={streamingMessage} />}
          {error && (
            <div className="text-red-500 mt-4 p-2 bg-red-100 rounded">
              Error: {error}
            </div>
          )}
        </ScrollArea>
        {isLoading && (
          <div className="flex justify-center">
            <LoadingIndicator />
          </div>
        )}
        <div className="">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}