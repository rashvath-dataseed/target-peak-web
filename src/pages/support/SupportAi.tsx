"use client";

import React, { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSupportAiContent, getAnswerByQuestionId } from "./Services/api";

/* ---------------- TYPES ---------------- */

type MessageType = "bot" | "user";

type Message = {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
};

type Question = {
  id: number;
  question: string;
};

type ExtraContent = {
  id: number;
  language_id: number;
  greeting?: string;
  selectQuestion?: string;
  thankYou: string;
  thankYouFinal: string;
  moreQuestions: string;
  moreQueGreeting: string;
  noQuestions: string;
  noQueThankYou: string;
  errorMsg: string;
};

/* ---------------- COMPONENT ---------------- */

const SupportAi = () => {
  const { toast } = useToast();
  const LANGUAGE_ID = 1;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ---------------- STATE ---------------- */

  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [introContent, setIntroContent] = useState<ExtraContent | null>(null);
  const [followUpContent, setFollowUpContent] = useState<ExtraContent | null>(
    null
  );

  const [questions, setQuestions] = useState<Question[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationEnded, setConversationEnded] = useState(false);

  /* ---------------- SCROLL TO BOTTOM ---------------- */

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /* ---------------- INITIAL LOAD ---------------- */

  const fetchInitialChatbotData = async () => {
    try {
      setLoading(true);
      const res = await getSupportAiContent(LANGUAGE_ID);

      const content = res.data.data.extraContent;
      setIntroContent(content);
      setQuestions(res.data.data.quesList || []);

      // Add initial greeting
      if (content?.greeting) {
        setTimeout(() => {
          addMessage("bot", content.greeting);
          setTimeout(() => {
            addMessage(
              "bot",
              content.selectQuestion || "Please select a question:"
            );
            setShowOptions(true);
          }, 800);
        }, 500);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load chatbot data",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialChatbotData();
  }, []);

  /* ---------------- ADD MESSAGE ---------------- */

  const addMessage = (type: MessageType, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString() + Math.random(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  /* ---------------- TYPING ANIMATION ---------------- */

  const simulateTyping = async (duration: number = 1000) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  /* ---------------- QUESTION CLICK ---------------- */

  const handleQuestionClick = async (
    questionId: number,
    questionText: string
  ) => {
    try {
      setShowOptions(false);

      // User message
      addMessage("user", questionText);

      // Simulate typing
      await simulateTyping(1200);

      const res = await getAnswerByQuestionId(LANGUAGE_ID, questionId);

      const answerData = res.data.data.ansList?.[0];
      const answer = answerData?.answer || "No answer available";
      const content = res.data.data.extraContent;

      setFollowUpContent(content);

      // Bot response with answer
      addMessage("bot", content.thankYou);
      await simulateTyping(800);
      addMessage("bot", answer);
      await simulateTyping(800);
      addMessage("bot", content.thankYouFinal);

      setShowOptions(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: followUpContent?.errorMsg || "Failed to fetch answer",
      });
      setShowOptions(true);
    }
  };

  /* ---------------- MORE QUESTIONS ---------------- */

  const handleMoreQuestions = async () => {
    setShowOptions(false);
    addMessage(
      "user",
      followUpContent?.moreQuestions || "Yes, I have more questions"
    );

    await simulateTyping(1000);
    addMessage(
      "bot",
      followUpContent?.moreQueGreeting ||
        "Great! Please select another question:"
    );

    // Reset follow-up content to show question list instead of yes/no buttons
    setFollowUpContent(null);
    setShowOptions(true);
  };

  /* ---------------- END CONVERSATION ---------------- */

  const handleEndConversation = async () => {
    setShowOptions(false);
    addMessage(
      "user",
      followUpContent?.noQuestions || "No, that's all for now"
    );

    await simulateTyping(1000);
    addMessage(
      "bot",
      followUpContent?.noQueThankYou || "Thank you! Have a great day!"
    );

    setConversationEnded(true);
  };

  /* ---------------- START NEW ---------------- */

  const handleStartNew = () => {
    setMessages([]);
    setShowOptions(false);
    setConversationEnded(false);
    setFollowUpContent(null);
    fetchInitialChatbotData();
  };

  /* ---------------- TYPING INDICATOR ---------------- */

  const TypingIndicator = () => (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );

  /* ---------------- UI ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 p-6 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto h-[600px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Support Assistant</h1>
              <p className="text-sm text-gray-500">Here to help you</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
          style={{ maxHeight: "calc(600px - 140px)" }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } items-start gap-3`}
            >
              {message.type === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
              )}

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>

              {message.type === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Options/Actions */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
          {showOptions && !conversationEnded && (
            <div className="space-y-3">
              {!followUpContent ? (
                // Initial questions
                <div className="space-y-2">
                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(q.id, q.question)}
                      className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-sm"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              ) : (
                // Follow-up options
                <div className="flex gap-3">
                  <button
                    onClick={handleMoreQuestions}
                    className="flex-1 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-sm"
                  >
                    {followUpContent.moreQuestions}
                  </button>
                  <button
                    onClick={handleEndConversation}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all text-sm"
                  >
                    {followUpContent.noQuestions}
                  </button>
                </div>
              )}
            </div>
          )}

          {conversationEnded && (
            <button
              onClick={handleStartNew}
              className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-sm"
            >
              Start New Conversation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportAi;
