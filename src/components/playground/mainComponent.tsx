
"use client";
import React from "react";
import ManagedTextarea from "@/src/components/common/managedTextarea";
import Footer from "@/src/components/common/footer";

type componentProps = object;
type componentState = {
  userInput: string;
};

export default class PlaygroundComponent extends React.Component<
  componentProps,
  componentState
> {

  constructor(props: componentProps) {
    super(props);
    this.state = {
      userInput: "",
    };
  }

  render() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <label htmlFor="input">
          <strong>User typed:</strong> {this.state.userInput}
        </label>

        <ManagedTextarea
          id="input"
          twClassList="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          followupAction={
            (eventKey) => {
              this.setState({ 
                userInput: `${this.state.userInput} ${this.state.userInput === "" ? "" : ">"} ${eventKey}`
               });
          }}
        />

        <button
          onClick={() => {
            this.setState({ userInput: "" });
            const inputElement = document.getElementById("input") as HTMLTextAreaElement;
            inputElement.value = "";
            inputElement.focus();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Clear Input
        </button>

        <Footer />
      </main>
    );
  }
}
