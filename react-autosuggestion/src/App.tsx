import Autosuggestion from "./components/autosuggestion";

const staticData: Record<string, unknown>[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Grapes" },
  { id: 4, name: "Mango" },
  { id: 5, name: "Orange" },
  { id: 6, name: "Pineapple" },
  { id: 7, name: "Strawberry" },
  { id: 8, name: "Watermelon" },
];
function App() {
  const fetchSuggestion = async (query: string) => {
    // return result
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>AutoSuggestion</h1>
      <Autosuggestion
        placeholder="Enter Recipe Name"
        // staticData={staticData}
        dataKey="name"
        fetchSuggestion={fetchSuggestion}
        onSelect={(res) => console.log(res)}
        onChange={(input: string) => console.log(input)}
        onBlur={(e) => console.log(e)}
        onFocus={(e) => console.log(e)}
        customLoading={<>Loading Recipes...</>}
        customStyle={{}}
      />
    </div>
  );
}
export default App;
