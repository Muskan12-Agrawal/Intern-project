export  interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  messages: Message[];
}
 