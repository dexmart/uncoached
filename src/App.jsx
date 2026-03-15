import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import PricingPage from './pages/PricingPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminLayout from './components/AdminLayout'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminAudioFamiliesPage from './pages/admin/AdminAudioFamiliesPage'
import AdminAudioBreathsPage from './pages/admin/AdminAudioBreathsPage'
import AdminGuidedShiftCategoriesPage from './pages/admin/AdminGuidedShiftCategoriesPage'
import AdminGuidedShiftsPage from './pages/admin/AdminGuidedShiftsPage'
import AdminPocketPromptCategoriesPage from './pages/admin/AdminPocketPromptCategoriesPage'
import AdminPocketPromptsPage from './pages/admin/AdminPocketPromptsPage'
import AdminClarityCardsPage from './pages/admin/AdminClarityCardsPage'
import AdminAffirmationCategoriesPage from './pages/admin/AdminAffirmationCategoriesPage'
import AdminAffirmationsPage from './pages/admin/AdminAffirmationsPage'
import AdminVoiceNotesPage from './pages/admin/AdminVoiceNotesPage'

// Member Pages
import DashboardPage from './pages/member/DashboardPage'
import FieldPage from './pages/member/FieldPage'
import AudioBreathsPage from './pages/member/AudioBreathsPage'
import AudioBreathPlayerPage from './pages/member/AudioBreathPlayerPage'
import GuidedShiftsPage from './pages/member/GuidedShiftsPage'
import GuidedShiftPlayerPage from './pages/member/GuidedShiftPlayerPage'
import PocketPromptsPage from './pages/member/PocketPromptsPage'
import ClarityCardsPage from './pages/member/ClarityCardsPage'
import ClarityCardDetailPage from './pages/member/ClarityCardDetailPage'
import AfformationsPage from './pages/member/AfformationsPage'
import VoiceNotesPage from './pages/member/VoiceNotesPage'
import ProfilePage from './pages/member/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
                <GuidedShiftPlayerPage />
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
            path="/dashboard/clarity-cards/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <ClarityCardDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/afformations"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AfformationsPage />
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
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="audio-families" element={<AdminAudioFamiliesPage />} />
            <Route path="audio-breaths" element={<AdminAudioBreathsPage />} />
            <Route path="guided-shift-categories" element={<AdminGuidedShiftCategoriesPage />} />
            <Route path="guided-shifts" element={<AdminGuidedShiftsPage />} />

            <Route path="pocket-prompt-categories" element={<AdminPocketPromptCategoriesPage />} />
            <Route path="pocket-prompts" element={<AdminPocketPromptsPage />} />

            <Route path="clarity-cards" element={<AdminClarityCardsPage />} />

            <Route path="affirmation-categories" element={<AdminAffirmationCategoriesPage />} />
            <Route path="affirmations" element={<AdminAffirmationsPage />} />

            <Route path="voice-notes" element={<AdminVoiceNotesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
