import React from "react";

function SuggestionsList({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) {
  const getHighLightedText = (text, highlight) => {
    const pattern = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(pattern);

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => onSuggestionClick(currentSuggestion)}
          >
            {getHighLightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
}

export default SuggestionsList;
