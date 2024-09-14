import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import SuggestionsList from "./suggestion-list";
import "./styles.css";
import useCache from "../hooks/use-cache";

export interface IAutosuggestion {
  placeholder: string;
  dataKey: string;
  fetchSuggestion: FetchSuggestion;
  onSelect: () => void;
  onChange: (input: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  customStyle: Record<string, unknown>;
  customLoading: JSX.Element | null;
  staticData?: Record<string, unknown>[];
}

type FetchSuggestion = (query: string) => Promise<Response>;

const Autosuggestion: JSX.Element = ({
  placeholder,
  dataKey,
  staticData = undefined,
  fetchSuggestion,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyle,
  customLoading,
}: IAutosuggestion) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { getCache, setCache } = useCache();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestion = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      let result: unknown;
      if (staticData) {
        result = staticData.filter((data) => {
          return data?.name.toLoweCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      setSuggestions(result);
      setCache(inputValue, result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedGetSuggestion = useCallback(debounce(getSuggestion, 400), []);

  useEffect(() => {
    if (inputValue.length > 1) {
      const cacheSuggestion = getCache(inputValue);
      if (cacheSuggestion) {
        setSuggestions(cacheSuggestion);
      } else debouncedGetSuggestion(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleInputSuggestionClick = (currentSuggestion) => {
    setInputValue(currentSuggestion);
    onSelect(currentSuggestion);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInput}
        onBlur={onBlur}
        onFocus={onFocus}
        style={customStyle}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionsList
            suggestions={suggestions}
            dataKey={dataKey}
            highlight={inputValue}
            onSuggestionClick={handleInputSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autosuggestion;
