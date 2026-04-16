import React, { useState } from 'react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';
import BlogPage from './BlogPage';
import ExplorePage from './ExplorePage';
import BrandManagementPage from './BrandManagementPage';
import WebsitesAppsPage from './WebsitesAppsPage';
import AutomationAIPage from './AutomationAIPage';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('home');

    const renderPage = () => {
        if (page === 'blog')   return <BlogPage onNavigate={setPage} />;
        if (page === 'blog-1') return <BlogPage onNavigate={setPage} initialArticle="1" />;
        if (page === 'blog-2') return <BlogPage onNavigate={setPage} initialArticle="2" />;
        if (page === 'blog-3') return <BlogPage onNavigate={setPage} initialArticle="3" />;
        if (page === 'blog-4') return <BlogPage onNavigate={setPage} initialArticle="4" />;
        if (page === 'explore')          return <ExplorePage onNavigate={setPage} />;
        if (page === 'brand-management') return <BrandManagementPage onNavigate={setPage} />;
        if (page === 'websites-apps')    return <WebsitesAppsPage onNavigate={setPage} />;
        if (page === 'automation-ai')    return <AutomationAIPage onNavigate={setPage} />;
        if (page === 'projects')         return <ProjectsPage onNavigate={setPage} />;
        if (page === 'about')            return <AboutPage onNavigate={setPage} />;
        return <LandingPage onNavigate={setPage} />;
    };

    return (
        <>
            {renderPage()}
            {loading && <PreloadScreen onComplete={() => setLoading(false)} />}
        </>
    );
};

export default App;