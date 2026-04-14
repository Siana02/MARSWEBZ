import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';
import BlogPage from './BlogPage';
import ExplorePage from './ExplorePage';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('home');

    if (loading) {
        return <PreloadScreen onComplete={() => setLoading(false)} />;
    }

    if (page === 'blog') return <BlogPage onNavigate={setPage} />;
    if (page === 'explore') return <ExplorePage onNavigate={setPage} />;
    return <LandingPage onNavigate={setPage} />;
};

export default App;