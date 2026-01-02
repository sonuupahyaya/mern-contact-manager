import { Toaster } from 'react-hot-toast';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { useContacts } from './hooks/useContacts';

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"/>
    <rect width="18" height="18" x="3" y="4" rx="2"/>
    <circle cx="12" cy="10" r="2"/>
    <line x1="8" x2="8" y1="2" y2="4"/>
    <line x1="16" x2="16" y1="2" y2="4"/>
  </svg>
);

function App() {
  const { contacts, loading, addContact, deleteContact } = useContacts();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.95) 0%, rgba(20, 20, 40, 0.95) 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '14px 18px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            fontSize: '0.9375rem',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="app-container">
        <header className="header fade-in">
          <div className="logo">
            <div className="logo-icon">
              <LogoIcon />
            </div>
          </div>
          <h1>ContactHub</h1>
          <p>Professional Contact Management System</p>
        </header>

        <main className="main-grid">
          <ContactForm onSubmit={addContact} />
          <ContactList
            contacts={contacts}
            loading={loading}
            onDelete={deleteContact}
          />
        </main>
      </div>
    </>
  );
}

export default App;
