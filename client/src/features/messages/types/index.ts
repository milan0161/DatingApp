interface Message {
  id: number;
  senderId: number;
  senderUsername: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientUsername: string;
  recipientPhotoUrl: string;
  content: string;
  dateRead: string | null;
  messageSent: string;
}

interface PaginationMessagesRequest extends PaginationRequest {
  container: string;
}

interface SendMessage {
  recipientUsername: string;
  content: string;
}

interface IMessageInitalState {
  messages: Message[];
}

interface Group {
  name: string;
  connections: Connections[];
}

interface Connections {
  connectionId: string;
  username: string;
}
