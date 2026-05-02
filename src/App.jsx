import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import PreloadScreen from './PreloadScreen';
import LandingPage from './LandingPage';
import BlogPage from './BlogPage';
import ExplorePage from './ExplorePage';
import BrandManagementPage from './BrandManagementPage';
import WebsitesAppsPage from './WebsitesAppsPage';
import AutomationAIPage from './AutomationAIPage';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsOfServicePage from './TermsOfServicePage';
import CookieBanner from './CookieBanner';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('home');
    const [scrollToContact, setScrollToContact] = useState(false);

    const navigate = (target) => {
        if (target === 'contact') {
            setScrollToContact(true);
            setPage('home');
        } else {
            window.scrollTo(0, 0);
            setScrollToContact(false);
            setPage(target);
        }
    };

    const renderPage = () => {
        if (page === 'blog')   return <BlogPage onNavigate={navigate} />;
        if (page === 'blog-1') return <BlogPage onNavigate={navigate} initialArticle="1" />;
        if (page === 'blog-2') return <BlogPage onNavigate={navigate} initialArticle="2" />;
        if (page === 'blog-3') return <BlogPage onNavigate={navigate} initialArticle="3" />;
        if (page === 'blog-4') return <BlogPage onNavigate={navigate} initialArticle="4" />;
        if (page === 'explore')          return <ExplorePage onNavigate={navigate} />;
        if (page === 'brand-management') return <BrandManagementPage onNavigate={navigate} />;
        if (page === 'websites-apps')    return <WebsitesAppsPage onNavigate={navigate} />;
        if (page === 'automation-ai')    return <AutomationAIPage onNavigate={navigate} />;
        if (page === 'projects')         return <ProjectsPage onNavigate={navigate} />;
        if (page === 'about')            return <AboutPage onNavigate={navigate} />;
        if (page === 'privacy')          return <PrivacyPolicyPage onNavigate={navigate} />;
        if (page === 'terms')            return <TermsOfServicePage onNavigate={navigate} />;
        return <LandingPage onNavigate={navigate} scrollToContact={scrollToContact} onContactScrolled={() => setScrollToContact(false)} />;
    };

    return (
        <>
            {renderPage()}
            {loading && <PreloadScreen onComplete={() => setLoading(false)} />}
            <CookieBanner onNavigate={navigate} />
            <Analytics />
        </>
    );
};

export default App;