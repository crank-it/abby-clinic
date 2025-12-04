'use client';

import { useState } from 'react';
import { ChatTrigger } from './ChatTrigger';
import { ChatModal } from './ChatModal';

export function QualificationBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatTrigger onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
