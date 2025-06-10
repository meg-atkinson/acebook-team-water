import { SearchResult } from "./SearchResult";
import "./SearchResultList.css";

export const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
        {results.map((result, id) => {
            return (
            <div key={id}>
                <SearchResult result={result} key={id}/>
            </div>
            );
        })}
        </div>
    );
};