interface Message {
  id: number;
  senderId: number;
  senderUsername: string;
  senderPhotoUrl: string;
  recipientId: number;
  recipientUsername: string;
  recipientPhotoUrl: string;
  content: string;
  dateRead: Date | null;
  messageSent: Date;
}

interface PaginationMessagesRequest extends PaginationRequest {
  container: string;
}

interface SendMessage {
  recipientUsername: string;
  content: string;
}
