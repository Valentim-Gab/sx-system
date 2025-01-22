import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginRoute } from './LoginRoute'
import { lazy, Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import PublicLayout from '@/layouts/PublicLayout'

const Blog = lazy(() => import('@/pages/blog/Blog'))
const ConfigPage = lazy(() => import('@/pages/configuracoes/ConfigPage'))
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const VerifyEmail = lazy(() => import('@/pages/auth/VerifyEmail'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))
const ConteudoSitePage = lazy(
  () => import('@/pages/configuracoes/ConteudoSitePage')
)
const ContaPage = lazy(() => import('@/pages/configuracoes/ContaPage'))
const AlterarSenhaPage = lazy(
  () => import('@/pages/configuracoes/AlterarSenhaPage')
)
const ContatosPage = lazy(() => import('@/pages/configuracoes/ContatosPage'))
const PreferenciasPage = lazy(
  () => import('@/pages/configuracoes/PreferenciasPage')
)
const Mensagens = lazy(() => import('@/pages/message/Mensagens'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const AppRoutes = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={MainLayout} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="blog" element={<Blog />} />
            <Route path="mensagens" element={<Mensagens />} />
            <Route path="configuracoes">
              <Route index element={<ConfigPage />} />
              <Route path="website" element={<ConteudoSitePage />} />
              <Route path="conta" element={<ContaPage />} />
              <Route path="senha" element={<AlterarSenhaPage />} />
              <Route path="contatos" element={<ContatosPage />} />
              <Route path="preferencias" element={<PreferenciasPage />} />
            </Route>
          </Route>
          <Route path="public" element={<PublicLayout />}>
            <Route path="email-confirmation" element={<VerifyEmail />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRoutes
