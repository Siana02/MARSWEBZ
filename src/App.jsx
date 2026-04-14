import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? <PreloadScreen onComplete={() => setLoading(false)} /> : <LandingPage />}
        </>
    );
};

export default App;