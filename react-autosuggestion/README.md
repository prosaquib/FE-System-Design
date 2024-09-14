# React Auto-suggestion Component

This is a lightweight, customizable, and responsive auto-suggestion component built with React. It supports both static data sources and fetching data from APIs. Additionally, it includes caching mechanisms, dynamic suggestions display, and the ability to select one suggestion from multiple options.

## Features

- **Supports Static Data**: You can provide a static list of suggestions to the component.
- **API Integration**: Fetch suggestions from remote APIs and display them as the user types.
- **Caching**: Caches previously fetched suggestions to minimize API calls and improve performance.
- **Dynamic Suggestions**: Suggestions are filtered in real-time as the user types in the input box.
- **Keyboard Navigation**: Users can navigate suggestions using the keyboard arrows and select using `Enter`.
- **Mouse Support**: Users can also click on any suggestion to select it.
- **Customizable**: Easily style the input and suggestion dropdown to suit your application.

## Props

| Prop               | Type       | Description                                                                                                                                            |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `staticData`       | `Array`    | A static list of suggestions (optional).                                                                                                               |
| `fetchSuggestions` | `Function` | A function to fetch suggestions from an API (optional). This function takes a single argument `query` and returns a promise that resolves to an array. |
| `onSelect`         | `Function` | Callback fired when a suggestion is selected. Receives the selected suggestion as an argument.                                                         |
| `placeholder`      | `String`   | Placeholder text for the input field.                                                                                                                  |
| `cacheResults`     | `Boolean`  | If `true`, previously fetched suggestions will be cached for faster access (default: `true`).                                                          |

## How It Works

1. **Static Data**: If you pass a `data` prop, the component will use that static array to filter suggestions based on the user's input.
2. **API Support**: If you provide a `fetchSuggestions` prop, the component will fetch data from the API as the user types.
3. **Caching**: When using the API, previously fetched suggestions will be cached by default to avoid redundant API calls for the same query. You can disable this by setting `cacheResults` to `false`.
4. **Selection**: When a user selects a suggestion, the `onSelect` callback is triggered, allowing you to handle the selected value.

## Keyboard Navigation

- **Up/Down Arrows**: Navigate through the suggestions.
- **Enter**: Select the highlighted suggestion.
- **Escape**: Close the suggestions dropdown.

## Future Improvements

- Add support for multi-select functionality.
- Allow custom templates for rendering suggestions.
- Add more accessibility features (e.g., better ARIA support).
- Support for paginated API responses.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
