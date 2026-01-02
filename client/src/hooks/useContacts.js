import { useState, useEffect, useCallback } from 'react';
import { contactService } from '../services/api';
import toast from 'react-hot-toast';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await contactService.getAll(params);
      setContacts(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  const addContact = async (contactData) => {
    try {
      const response = await contactService.create(contactData);
      setContacts((prev) => [response.data, ...prev]);
      toast.success('Contact added successfully!');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactService.delete(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success('Contact deleted successfully!');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    deleteContact,
    refetch: fetchContacts,
  };
};
