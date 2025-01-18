import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginRoute } from './LoginRoute'
import Blog from '@/pages/blog/Blog'
import ConfigPage from '@/pages/configuracoes/ConfigPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import VerifyEmail from '@/pages/auth/VerifyEmail'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import ResetPassword from '@/pages/auth/ResetPassword'
import MainLayout from '@/layouts/MainLayout'
import PublicLayout from '@/layouts/PublicLayout'
import ConteudoSitePage from '@/pages/configuracoes/ConteudoSitePage'
import ContaPage from '@/pages/configuracoes/ContaPage'
import AlterarSenhaPage from '@/pages/configuracoes/AlterarSenhaPage'
import ContatosPage from '@/pages/configuracoes/ContatosPage'
import PreferenciasPage from '@/pages/configuracoes/PreferenciasPage'
import Mensagens from '@/pages/message/Mensagens'

const AppRoutes = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
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
      </Routes>
    </Router>
  )
}

export default AppRoutes
