export interface Autosuggestion  {
    placeholder: string;
    dataKey: string;
    suggestion: Record<string,unknown>[];
    onSelect : () => void;
    onChange: () => void;
    onBlur: () => void;
    onFocus: () => void;
}

// type Suggestion = {
//     value: string;
//     label: string;
//     description: string;
//     image: string;
// }