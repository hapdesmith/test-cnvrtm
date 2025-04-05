'use client';

import { message } from 'antd';
import { createContext, ReactNode, useContext } from 'react';

interface MessageContextType {
  showSuccess: (content: string) => void;
  showError: (content: string) => void;
  showWarning: (content: string) => void;
  showInfo: (content: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messageApi, contextHolder] = message.useMessage();

  const value = {
    showSuccess: (content: string) => messageApi.open({ type: 'success', content, duration: 3 }),
    showError: (content: string) => messageApi.open({ type: 'error', content, duration: 3 }),
    showWarning: (content: string) => messageApi.open({ type: 'warning', content, duration: 3 }),
    showInfo: (content: string) => messageApi.open({ type: 'info', content, duration: 3 }),
  };

  return (
    <MessageContext.Provider value={value}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}
