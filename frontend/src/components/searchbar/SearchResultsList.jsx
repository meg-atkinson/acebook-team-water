import { SearchResult } from "./SearchResult";
import "./SearchResultList.css";

export const SearchResultsList = ({ setResults, results, setInput }) => {
    return (
        <div className="results-list">
        {results.map((result, id) => {
            return (
            <div key={id}>
                <SearchResult setInput={setInput} setResults={setResults} result={result} key={id}/>
            </div>
            );
        })}
        </div>
    );
};