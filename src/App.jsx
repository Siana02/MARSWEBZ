import React, { useState, useEffect } from 'react';
import PreloadScreen from './PreloadScreen';

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a fetch/loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Adjust time as necessary
        return () => clearTimeout(timer);
    }, []);

    return (
        <> 
            {loading ? <PreloadScreen /> : <div>Landing Page Content</div>}
        </>
    );
};

export default App;