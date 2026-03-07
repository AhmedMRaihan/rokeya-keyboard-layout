
"use client";

import { useState } from "react";
import ManagedTextarea from "@/src/components/common/managedTextarea";
import Footer from "@/src/components/common/footer";

interface ClearTextProps {
  onClickHandler: (textInput: string) => void;
}

const ClearInput = ({ onClickHandler }: ClearTextProps) => {
  return(
    <button
      onClick={() => {
          onClickHandler("");
          const inputElement = document.getElementById("input") as HTMLTextAreaElement;
          inputElement.value = "";
          inputElement.focus();
        }}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
      Clear Input
    </button>
  );
}

const PlaygroundComponent = () => {

  const [userInput, setUserInput] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <label htmlFor="input">
        <strong>User typed:</strong> {userInput}
      </label>

      <ManagedTextarea
        id="input"
        twClassList="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        followupAction={
          (eventKey) => {
            setUserInput(prev => `${prev} ${prev === "" ? "" : ">"} ${eventKey}`);
        }}
      />

      <ClearInput onClickHandler={setUserInput} />

      <Footer />
    </main>
  );
}

export default PlaygroundComponent;

