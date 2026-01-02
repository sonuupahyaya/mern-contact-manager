import { useState, useMemo } from 'react';
import { SearchIcon, TrashIcon, UsersIcon, InboxIcon } from './Icons';

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="skeleton-row">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-cell name"></div>
        <div className="skeleton skeleton-cell email"></div>
        <div className="skeleton skeleton-cell phone"></div>
        <div className="skeleton skeleton-cell message"></div>
        <div className="skeleton skeleton-cell date"></div>
        <div className="skeleton skeleton-cell action"></div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ hasSearch }) => (
  <div className="empty-state fade-in">
    <div className="empty-icon">
      <InboxIcon />
    </div>
    <h3>{hasSearch ? 'No matches found' : 'No contacts yet'}</h3>
    <p>
      {hasSearch
        ? 'Try adjusting your search to find what you\'re looking for'
        : 'Start by adding your first contact using the form'}
    </p>
  </div>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ContactList = ({ contacts, loading, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [deletingId, setDeletingId] = useState(null);

  const filteredAndSortedContacts = useMemo(() => {
    let result = [...contacts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.phone.includes(query)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [contacts, searchQuery, sortBy]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <h2>
          <UsersIcon /> Contact Directory
        </h2>
      </div>

      <div className="stats-bar">
        <span className="count">
          Total Contacts <span className="badge">{contacts.length}</span>
        </span>
        {searchQuery && (
          <span>{filteredAndSortedContacts.length} results</span>
        )}
      </div>

      <div className="card-body">
        <div className="search-sort-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
          </select>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : filteredAndSortedContacts.length === 0 ? (
          <EmptyState hasSearch={!!searchQuery.trim()} />
        ) : (
          <div className="table-container">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Added</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedContacts.map((contact, index) => (
                  <tr 
                    key={contact._id} 
                    className="slide-in"
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    <td>
                      <div className="contact-name">
                        <div className="contact-avatar">
                          {getInitials(contact.name)}
                        </div>
                        {contact.name}
                      </div>
                    </td>
                    <td>
                      <a href={`mailto:${contact.email}`} className="contact-email">
                        {contact.email}
                      </a>
                    </td>
                    <td className="contact-phone">{contact.phone}</td>
                    <td className="contact-message" title={contact.message}>
                      {contact.message || '—'}
                    </td>
                    <td className="contact-date">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-icon"
                        onClick={() => handleDelete(contact._id)}
                        disabled={deletingId === contact._id}
                        title="Delete contact"
                        aria-label="Delete contact"
                      >
                        {deletingId === contact._id ? (
                          <span
                            className="loading-spinner"
                            style={{ 
                              borderColor: 'rgba(239, 68, 68, 0.3)',
                              borderTopColor: 'var(--danger)' 
                            }}
                          ></span>
                        ) : (
                          <TrashIcon />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
