import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PlayLevel from './pages/PlayLevel';
import AdminDashboard from './pages/AdminDashboard';
import LevelEditor from './pages/LevelEditor';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Leaderboard from './pages/Leaderboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SqlTutorials from './pages/SqlTutorials';
import SqlTutorialDetail from './pages/SqlTutorialDetail';
import LevelExplanations from './pages/LevelExplanations';
import Blog from './pages/Blog';
import PageTransition from './components/PageTransition';
import TutorialLayout from './layouts/TutorialLayout';
import ScrollToTop from './components/ScrollToTop';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Routes location={location} key={location.pathname.split('/')[1] || '/'}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsConditions /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactUs /></PageTransition>} />
        
        {/* Tutorials with static sidebar layout */}
        <Route element={<TutorialLayout />}>
          <Route path="/tutorials/:topicId" element={<SqlTutorialDetail />} />
        </Route>

        <Route path="/tutorials" element={<PageTransition variant="slide"><SqlTutorials /></PageTransition>} />
        <Route path="/levels-guide" element={<PageTransition><LevelExplanations /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <PageTransition><Dashboard /></PageTransition>
          </ProtectedRoute>
        } />
        
        <Route path="/level/:id" element={
          <ProtectedRoute>
            <PageTransition variant="zoom"><PlayLevel /></PageTransition>
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <PageTransition><AdminDashboard /></PageTransition>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/level/new" element={
          <ProtectedRoute adminOnly>
            <PageTransition><LevelEditor /></PageTransition>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/level/:id" element={
          <ProtectedRoute adminOnly>
            <PageTransition><LevelEditor /></PageTransition>
          </ProtectedRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
