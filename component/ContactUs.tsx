import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, X, AlertCircle } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  phone: string;
}

const ContactUs = () => {
  // Sample data - replace with actual API call
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@email.com",
      message: "Interested in your construction services for a commercial project. Need a consultation.",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      email: "sarah.m@company.com",
      message: "Looking for engineering consulting services. Would like to discuss project requirements.",
      phone: "+1 (555) 234-5678"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@industrial.com",
      message: "Need information about your industrial equipment and maintenance services.",
      phone: "+1 (555) 345-6789"
    }
  ]);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-3">
            Contact Inquiries
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Manage and respond to customer inquiries. View contact details and messages from potential clients.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground font-medium">Total Contacts</p>
            <p className="text-3xl font-heading font-bold text-primary mt-1">{contacts.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground font-medium">Unread Messages</p>
            <p className="text-3xl font-heading font-bold text-secondary mt-1">{contacts.length}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground font-medium">This Week</p>
            <p className="text-3xl font-heading font-bold text-primary mt-1">{Math.min(contacts.length, 5)}</p>
          </div>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <AlertCircle className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground text-lg font-medium">No contact inquiries yet</p>
            <p className="text-muted-foreground text-sm mt-1">Customer messages will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Contact Info */}
                  <div className="flex-1 space-y-4">
                    {/* Name and Actions */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <User className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-bold text-foreground">
                            {contact.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Contact ID: #{contact.id}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        disabled={deletingId === contact.id}
                        className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg hover:bg-destructive/10"
                        title="Delete contact"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Contact Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="flex items-start gap-3 bg-accent/50 p-3 rounded-lg border border-border">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Mail className="text-primary" size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Email
                          </p>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-sm text-foreground font-medium hover:text-primary transition-colors break-all"
                          >
                            {contact.email}
                          </a>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-3 bg-accent/50 p-3 rounded-lg border border-border">
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Phone className="text-secondary" size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            Phone
                          </p>
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-sm text-foreground font-medium hover:text-secondary transition-colors break-all"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-accent/30 p-4 rounded-lg border border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageSquare className="text-primary" size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Message
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
