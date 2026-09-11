import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerCareTicket } from '../../types';
import {
  MessageSquare,
  X,
  Send,
  UserCheck,
  ShieldAlert,
  PhoneCall,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultOrderId?: string;
}

export const CustomerCareModal: React.FC<Props> = ({ isOpen, onClose, defaultOrderId }) => {
  const { t, tickets, createCustomerTicket, sendTicketMessage } = useApp();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets.length > 0 ? tickets[0].id : null
  );
  const [newSubject, setNewSubject] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  if (!isOpen) return null;

  const currentTicket = tickets.find((tkt) => tkt.id === selectedTicketId) || tickets[0];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessageText.trim()) return;

    const newId = createCustomerTicket(
      newSubject,
      newMessageText,
      defaultOrderId,
      'Priya Sharma (Customer)',
      '+91 98260 11928'
    );
    setSelectedTicketId(newId);
    setNewSubject('');
    setNewMessageText('');
    setIsCreatingNew(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentTicket) return;

    sendTicketMessage(currentTicket.id, 'customer', 'Priya Sharma (Customer)', replyText);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-300">
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-emerald-100">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                {t.client.customerCareTitle}
              </h2>
              <p className="text-2xs text-emerald-200">
                Connected directly to Local Mandi Officer: Rameshwar Patel (Sehore Kendra)
              </p>
            </div>
          </div>
          <button
            id="care-modal-close-btn"
            onClick={onClose}
            className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Ticket List Sidebar */}
          <div className="w-full md:w-72 bg-stone-50 border-r border-stone-200 p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Your Queries ({tickets.length})
              </span>
              <button
                id="create-new-ticket-btn"
                onClick={() => setIsCreatingNew(true)}
                className="text-xs bg-emerald-700 text-white px-2 py-1 rounded font-medium hover:bg-emerald-800 cursor-pointer"
              >
                + New Query
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {tickets.map((tkt) => {
                const isSelected = !isCreatingNew && currentTicket?.id === tkt.id;
                return (
                  <button
                    key={tkt.id}
                    id={`ticket-item-${tkt.id}`}
                    onClick={() => {
                      setSelectedTicketId(tkt.id);
                      setIsCreatingNew(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition cursor-pointer ${
                      isSelected
                        ? 'bg-white border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                        : 'bg-stone-100/70 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-emerald-800">
                        {tkt.ticketNo}
                      </span>
                      <span
                        className={`text-2xs px-1.5 py-0.5 rounded font-medium ${
                          tkt.status === 'resolved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tkt.status}
                      </span>
                    </div>
                    <div className="font-medium text-stone-800 line-clamp-1">
                      {tkt.subject}
                    </div>
                    <div className="text-2xs text-stone-400 mt-1 flex items-center justify-between">
                      <span>{tkt.createdAt}</span>
                      <span>{tkt.messages.length} msg</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Officer Direct Contact Card */}
            <div className="mt-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-2xs text-stone-700">
              <div className="font-bold text-emerald-900 flex items-center gap-1 mb-0.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                Local Hub Admin Helpline
              </div>
              <div className="text-stone-600">Officer: Rameshwar Patel</div>
              <div className="text-stone-600">Direct Desk: +91 94250 09911</div>
              <div className="text-emerald-700 font-medium mt-1">Available 6:00 AM - 9:00 PM</div>
            </div>
          </div>

          {/* Conversation or New Ticket Form Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {isCreatingNew ? (
              <form onSubmit={handleCreateTicket} className="p-5 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-stone-800 mb-3">
                  Ask Question or Lodge Complaint to Local Mandi Admin
                </h3>

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    id="new-ticket-subject-input"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Quality inquiry for Savitri Devi's tomatoes or bulk delivery time"
                    className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div className="flex-1 mb-3">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    id="new-ticket-message-input"
                    rows={6}
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder={t.client.typeMessage}
                    className="w-full text-xs p-2.5 rounded border border-stone-300 focus:outline-hidden focus:border-emerald-600 resize-none h-44"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-3 py-1.5 rounded border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    type="submit"
                    id="submit-new-ticket-btn"
                    className="px-4 py-1.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit to Local Admin
                  </button>
                </div>
              </form>
            ) : currentTicket ? (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Active Ticket Banner */}
                <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      {currentTicket.subject}
                    </div>
                    <div className="text-2xs text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>Ticket #{currentTicket.ticketNo}</span>
                      <span>•</span>
                      <span>{currentTicket.customerName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xs px-2 py-0.5 rounded font-bold uppercase ${
                        currentTicket.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentTicket.status}
                    </span>
                  </div>
                </div>

                {/* Messages Chat Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
                  {currentTicket.messages.map((msg) => {
                    const isAdmin = msg.sender === 'admin';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${
                          isAdmin ? 'mr-auto items-start' : 'ml-auto items-end'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5 text-2xs text-stone-500">
                          <span className="font-semibold text-stone-700">
                            {isAdmin ? '🌾 ' + msg.senderName : '👤 You'}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg text-xs leading-relaxed ${
                            isAdmin
                              ? 'bg-emerald-50 text-stone-800 border border-emerald-200 rounded-tl-xs'
                              : 'bg-stone-800 text-white rounded-tr-xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Box */}
                <form
                  onSubmit={handleSendReply}
                  className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    id="care-reply-input"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply to the Local Admin..."
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    id="care-reply-submit-btn"
                    className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {t.client.send}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500 text-xs">
                No tickets open. Click "+ New Query" to talk to the local admin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
