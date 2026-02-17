import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import PricingPage from './pages/PricingPage'
import ProtectedRoute from './components/ProtectedRoute'

// Member Pages
import DashboardPage from './pages/member/DashboardPage'
import FieldPage from './pages/member/FieldPage'
import AudioBreathsPage from './pages/member/AudioBreathsPage'
import AudioBreathPlayerPage from './pages/member/AudioBreathPlayerPage'
import GuidedShiftsPage from './pages/member/GuidedShiftsPage'
import PocketPromptsPage from './pages/member/PocketPromptsPage'
import ClarityCardsPage from './pages/member/ClarityCardsPage'
import AffirmationsPage from './pages/member/AffirmationsPage'
import VoiceNotesPage from './pages/member/VoiceNotesPage'

// Use basename only in production (when deployed to subdirectory)
const basename = import.meta.env.PROD ? '/mockup/dev/4' : '/'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Protected Routes (require auth) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/field"
            element={
              <ProtectedRoute requireSubscription={true}>
                <FieldPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/audio-breaths"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AudioBreathsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/audio-breaths/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AudioBreathPlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guided-shifts"
            element={
              <ProtectedRoute requireSubscription={true}>
                <GuidedShiftsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guided-shifts/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AudioBreathPlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pocket-prompts"
            element={
              <ProtectedRoute requireSubscription={true}>
                <PocketPromptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/clarity-cards"
            element={
              <ProtectedRoute requireSubscription={true}>
                <ClarityCardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/affirmations"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AffirmationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/voice-notes"
            element={
              <ProtectedRoute requireSubscription={true}>
                <VoiceNotesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
