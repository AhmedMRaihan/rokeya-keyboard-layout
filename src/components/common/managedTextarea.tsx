import React, { useEffect, useRef } from "react";
import { KeyboardHandler } from "@/lib/KeyboardHandler";

interface ManagedTextareaProps {
  id: string;
  rows: number;
  twClassList?: string;
  currentLanguage?: string;
  followupAction?: (eventKey: string) => void;
};

const ManagedTextarea = (
  { id, rows, twClassList, currentLanguage, followupAction }:ManagedTextareaProps) => {
  
  const keyboardHandler = useRef<KeyboardHandler>(new KeyboardHandler());

  const handleKeyDownEvent = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    updateText(event);
    if (followupAction) {
      followupAction(event.key);
    }
  };

  const updateText = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // console.debug("Key pressed:", event.key);
    
    const useDefaultBehaviour: boolean =
      keyboardHandler.current.handleKeyboardInput(
        event as unknown as KeyboardEvent,
        event.currentTarget,
        currentLanguage
      );

    if (useDefaultBehaviour === false) {
      event.preventDefault(); // prevent the default behavior of the key press
    }
  };

  useEffect(() => {
    document.getElementById(id)?.focus();
  }, [id]);
 
  return (
    <textarea
      name={id}
      aria-label={id}
      rows={rows}
      className={twClassList}
      id={id}
      defaultValue=""
      onKeyDown={handleKeyDownEvent}
      placeholder="টাইপ করা শুরু করুন ..."
    />
  );
}

export default ManagedTextarea;