"use client";
import { STATES } from "@/constants/enums";
import React, { JSX, useState } from "react";

type FSCState = "not-required" | "required" | "current" | "completed";
type FSCComponent = "fuelling" | "servicing" | "cleaning";

// Interface for state object
interface FSCStates {
  fuelling: FSCState;
  servicing: FSCState;
  cleaning: FSCState;
}

const FscComponent = () => {
  const [states, setStates] = useState<FSCStates>({
    fuelling: STATES.REQUIRED,
    servicing: STATES.REQUIRED,
    cleaning: STATES.REQUIRED,
  });

  // function to handle left clicking
  const handleLeftClick = (type: FSCComponent): void => {
    setStates((prev) => {
      const currentState = prev[type];

      let newState: FSCState = currentState;
      if (currentState === STATES.REQUIRED) {
        newState = STATES.CURRENT;
      } else if (currentState === STATES.CURRENT) {
        newState = STATES.COMPLETED;
      } else if (currentState === STATES.COMPLETED) {
        newState = STATES.CURRENT;
      }

      return { ...prev, [type]: newState };
    });
  };

  // function to handle right clicking
  const handleRightClick = (type: FSCComponent, e: React.MouseEvent): void => {
    e.preventDefault();
    setStates((prev) => {
      const currentState = prev[type];
      if (currentState === STATES.REQUIRED) {
        return { ...prev, [type]: STATES.NOT_REQUIRED };
      } else if (currentState === STATES.NOT_REQUIRED) {
        return { ...prev, [type]: STATES.REQUIRED };
      }
      return prev;
    });
  };

  // gets the state for initals
  const getStateLetter = (type: FSCComponent): string => {
    switch (type) {
      case "fuelling":
        return "F";
      case "servicing":
        return "S";
      case "cleaning":
        return "C";
      default:
        return "";
    }
  };

  // sorts out color based on the current state
  const getBgColor = (state: FSCState): string => {
    switch (state) {
      case STATES.NOT_REQUIRED:
        return "bg-white";
      case STATES.REQUIRED:
        return "bg-[#998DBF] hover:bg-[#6E5CA3]";
      case STATES.CURRENT:
        return "bg-[#D22D5C] hover:bg-[#A82443]";
      case STATES.COMPLETED:
        return "bg-[#319B31] hover-bg[#247524]";
      default:
        return "bg-[#998DBF] hover:bg-[#6E5CA3]";
    }
  };
  // Render individual moodlet with type safety
  const renderMoodlet = (type: FSCComponent): JSX.Element => {
    const state = states[type];
    return (
      <button
        className={` inline-flex items-center justify-center w-10 h-10 rounded-full  cursor-pointer mx-2 ${
          state === STATES.NOT_REQUIRED
            ? "border-4 border-[#998DBF]"
            : "border-none"
        } ${getBgColor(state)}`}
        onClick={() => handleLeftClick(type)}
        onContextMenu={(e) => handleRightClick(type, e)}
      >
        <p
          className={`text-lg font-bold  ${
            state === STATES.NOT_REQUIRED ? "text-[#998DBF]" : "text-white"
          }`}
        >
          {getStateLetter(type)}
        </p>
      </button>
    );
  };

  // Render word version item with type safety
  const renderWordItem = (type: FSCComponent): JSX.Element => {
    const state = states[type];
    return (
      <button
        key={type}
        onClick={() => handleLeftClick(type)}
        onContextMenu={(e) => handleRightClick(type, e)}
        className={`px-4 py-2 rounded-full cursor-pointer capitalize ${getBgColor(
          state,
        )} ${
          state === STATES.NOT_REQUIRED ? "text-[#998DBF]" : "text-white"
        } border-2 border-current`}
      >
        {type}
      </button>
    );
  };
  return (
    <main className="p-6 flex justify-center items-center flex-col min0">
      {/* Letter Moodlet */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 text-center">Letter Version</h3>
        <div className="flex items-center">
          {renderMoodlet("fuelling")}
          {renderMoodlet("servicing")}
          {renderMoodlet("cleaning")}
        </div>
      </div>

      {/* Word Moodlet */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-center">Word Version</h3>
        <div className="flex space-x-4">
          {(["fuelling", "servicing", "cleaning"] as FSCComponent[]).map(
            (type) => renderWordItem(type),
          )}
        </div>
      </div>
    </main>
  );
};

export default FscComponent;
