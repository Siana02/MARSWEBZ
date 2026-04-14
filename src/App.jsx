import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';

const App = () => {
    const [loading, setLoading] = useState(true);

    return (
        <> 
            {loading ? <PreloadScreen onComplete={() => setLoading(false)} /> : <div>Landing Page Content</div>}
        </>
    );
};

export default App;