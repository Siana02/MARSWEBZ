import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';
import BlogPage from './BlogPage';
import ExplorePage from './ExplorePage';
import BrandManagementPage from './BrandManagementPage';
import WebsitesAppsPage from './WebsitesAppsPage';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('home');

    if (loading) {
        return <PreloadScreen onComplete={() => setLoading(false)} />;
    }

    if (page === 'blog') return <BlogPage onNavigate={setPage} />;
    if (page === 'explore') return <ExplorePage onNavigate={setPage} />;
    if (page === 'brand-management') return <BrandManagementPage onNavigate={setPage} />;
    if (page === 'websites-apps') return <WebsitesAppsPage onNavigate={setPage} />;
    return <LandingPage onNavigate={setPage} />;
};

export default App;