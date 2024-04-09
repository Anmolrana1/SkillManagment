import React, { useState } from 'react';
import axios from 'axios';

const EmployeeRecommendations = () => {
    const [techStack, setTechStack] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const handleRecommendations = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/recommend', { tech_stack: techStack.split(','), proficiency: proficiency.split(',') });
            console.log(response)
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div>
            <h2>Employee Recommendations</h2>
            <div>
                <label htmlFor="techStack">Tech Stack:</label>
                <input type="text" id="techStack" value={techStack} onChange={(e) => setTechStack(e.target.value)} />
            </div>
            <div>
                <label htmlFor="proficiency">Proficiency:</label>
                <input type="text" id="proficiency" value={proficiency} onChange={(e) => setProficiency(e.target.value)} />
            </div>
            <button onClick={handleRecommendations}>Get Recommendations</button>
            <div>
                <h3>Top 10 Employee Recommendations:</h3>
                <ul>
                    {recommendations.map((recommendation, index) => (
                        <li key={index}>
                            {recommendation.Name} - Similarity Score: {recommendation.similarity_score}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployeeRecommendations;
