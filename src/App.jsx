import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';
import BlogPage from './BlogPage';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('home');

    if (loading) {
        return <PreloadScreen onComplete={() => setLoading(false)} />;
    }

    return page === 'blog'
        ? <BlogPage onNavigate={setPage} />
        : <LandingPage onNavigate={setPage} />;
};

export default App;