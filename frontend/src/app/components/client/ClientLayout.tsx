import { useState } from 'react';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  DollarSign,
  Briefcase,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { ClientDashboard } from './ClientDashboard';
import { ClientCase } from './ClientCase';
import { ClientDocuments } from './ClientDocuments';
import { ClientMessages } from './ClientMessages';
import { ClientBilling } from './ClientBilling';

interface ClientLayoutProps {
  onLogout: () => void;
}

export function ClientLayout({ onLogout }: ClientLayoutProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'case', name: 'My Case', icon: Briefcase },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'messages', name: 'Messages', icon: MessageSquare, badge: 1 },
    { id: 'billing', name: 'Billing', icon: DollarSign }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ClientDashboard onNavigate={setCurrentPage} />;
      case 'case':
        return <ClientCase />;
      case 'documents':
        return <ClientDocuments />;
      case 'messages':
        return <ClientMessages />;
      case 'billing':
        return <ClientBilling />;
      default:
        return <ClientDashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-card border-r border-border
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">LegalHub</h2>
                  <p className="text-xs text-muted-foreground">Client Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Case Info */}
          <div className="px-6 py-4 bg-primary/5 border-b border-border">
            <p className="text-xs text-muted-foreground mb-1">Your Case</p>
            <p className="text-sm font-medium text-foreground">Johnson Estate Planning</p>
            <p className="text-xs text-muted-foreground mt-1">CAS-2026-001</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setCurrentPage(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg
                        transition-colors text-sm
                        ${isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <span className={`
                          px-2 py-0.5 rounded-full text-xs font-medium
                          ${isActive 
                            ? 'bg-primary-foreground text-primary' 
                            : 'bg-accent text-accent-foreground'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                  JJ
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">John Johnson</p>
                  <p className="text-xs text-muted-foreground">Client</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-foreground hover:text-muted-foreground"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {navigation.find(n => n.id === currentPage)?.name || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs font-medium text-success">Sarah Mitchell - Available</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
