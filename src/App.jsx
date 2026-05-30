import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './site/Home'
import Login from './app/Login'
import AppLayout from './app/Layout'
import Dashboard from './app/Dashboard'
import MedicosList from './app/medicos/MedicosList'
import MedicoForm from './app/medicos/MedicoForm'
import MedicoDetalhe from './app/medicos/MedicoDetalhe'
import PagamentoLancar from './app/pagamentos/PagamentoLancar'
import PagamentoHistorico from './app/pagamentos/PagamentoHistorico'
import PagamentoDetalhe from './app/pagamentos/PagamentoDetalhe'
import LeadsList from './app/leads/LeadsList'
import PortalLayout from './portal/PortalLayout'
import DRE from './portal/DRE'
import Extratos from './portal/Extratos'
import Documentos from './portal/Documentos'
import MeusDados from './portal/MeusDados'
import { getSession } from './lib/auth'

function ProtectedRoute({ children }) {
  const session = getSession()
  const location = useLocation()
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="leads" element={<LeadsList />} />
        <Route path="medicos" element={<MedicosList />} />
        <Route path="medicos/novo" element={<MedicoForm />} />
        <Route path="medicos/:id" element={<MedicoDetalhe />} />
        <Route path="medicos/:id/editar" element={<MedicoForm />} />
        <Route path="pagamentos" element={<PagamentoHistorico />} />
        <Route path="pagamentos/lancar" element={<PagamentoLancar />} />
        <Route path="pagamentos/:id" element={<PagamentoDetalhe />} />
      </Route>

      {/* Portal do Médico — perfil "medico" */}
      <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
        <Route index element={<DRE />} />
        <Route path="extratos" element={<Extratos />} />
        <Route path="documentos" element={<Documentos />} />
        <Route path="perfil" element={<MeusDados />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
