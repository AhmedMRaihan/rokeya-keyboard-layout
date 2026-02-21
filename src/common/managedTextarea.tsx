import React from "react";
import { KeyboardHandler } from "@/lib/KeyboardHandler";

type componentPropse = {
    id: string;
    rows: number;
    twClassList?: string;
    followupAction?: (eventKey: string) => void;
    };

export default class ManagedTextarea extends React.Component<componentPropse> {
  private keyboardHandler: KeyboardHandler;

  constructor(props: componentPropse) {
    super(props);
    this.keyboardHandler = new KeyboardHandler();
  }

  private handleKeyDownEvent = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    this.updateText(event);
    if (this.props.followupAction) {
      this.props.followupAction(event.key);
    }
  };

  private updateText = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // console.debug("Key pressed:", event.key);

    const useDefaultBehaviour: boolean =
      this.keyboardHandler.handleKeyboardInput(
        event as unknown as KeyboardEvent,
        event.currentTarget,
      );

    if (useDefaultBehaviour === false) {
      event.preventDefault(); // prevent the default behavior of the key press
    }
  };

  componentDidMount(): void {
    document.getElementById(this.props.id)?.focus();
  }

  render() {
    return (
      <textarea
        name={this.props.id}
        aria-label={this.props.id}
        
        rows={this.props.rows}
        className={this.props.twClassList}
        id={this.props.id}
        defaultValue=""
        onKeyDown={this.handleKeyDownEvent}
        placeholder="টাইপ করা শুরু করুন ..."
      />
    );
  }
}
