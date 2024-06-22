'use client';

import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');

  useEffect(() => {
    if (session?.user?.id) {
      axios.get(`http://localhost:5555/api/user/${session.user.id}`).then((response) => {
        setName(response.data.profile?.name || '');
      });
    }
  }, [session]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (session?.user?.id) {
      try {
        const response = await axios.put('http://localhost:5555/api/user', {
          id: session.user.id,
          name,
        });
        if (response.status === 200) {
          alert('Name updated successfully');
        } else {
          alert('Failed to update name');
        }
      } catch (error) {
        console.error('Failed to update name:', error);
        alert('Failed to update name');
      }
    } else {
      console.error('No user ID found in session');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not signed in</p>
        <button >Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
