import React, { useState } from 'react';

function Form() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedSections, setSelectedSections] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);
        
        try {
            JSON.parse(input);  
        } catch (e) {
            setError('Invalid JSON');
            setShowDropdown(false);  
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:5000/bfhl', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: input
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setError("Error in fetching data");
            console.error("Error:", error);
        }
    }

    const handleSectionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSections(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON'
                />
                <button type="submit">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    {showDropdown && (
                        <div>
                            <label>Select sections to display: </label>
                            <select multiple={true} value={selectedSections} onChange={handleSectionChange}>
                                <option value="Characters">Characters</option>
                                <option value="Numbers">Numbers</option>
                                <option value="Highest Alphabet">Highest Alphabet</option>
                            </select>
                        </div>
                    )}
                    {selectedSections.includes('Characters') && (
                        <div>
                            <h4>Characters</h4>
                            <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
                        </div>
                    )}
                    {selectedSections.includes('Numbers') && (
                        <div>
                            <h4>Numbers</h4>
                            <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
                        </div>
                    )}
                    {selectedSections.includes('Highest Alphabet') && (
                        <div>
                            <h4>Highest Alphabet</h4>
                            <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Form;