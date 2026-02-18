export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  case: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  paidDate?: string;
}

export interface Event {
  id: number;
  title: string;
  type: 'meeting' | 'hearing' | 'deadline' | 'consultation' | 'internal';
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  caseNumber?: string;
  client?: string;
  attendees?: string[];
  isVirtual?: boolean;
  status: 'scheduled' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  client: string;
  type: string;
  status: 'active' | 'pending' | 'closed' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  dateOpened: string;
  nextDeadline?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  type: 'individual' | 'business';
  activeCases: number;
  totalCases: number;
  status: 'active' | 'inactive';
  joinedDate: string;
  lastContact: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'draft' | 'final' | 'signed' | 'pending-review';
  case: string;
  uploadedBy: string;
  uploadedDate: string;
  folder: string;
}

export interface Message {
  id: string;
  sender: string;
  role: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  case?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
}