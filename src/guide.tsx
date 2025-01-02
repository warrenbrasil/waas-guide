import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '@/pages/home';
import DocPage from './pages/doc';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/sidebar';
import { useGlobalContext } from "@/utils";
import Logo from './components/logo';
import { GlobalState } from './types';
import SearchPage from './pages/search';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

const Page = (
  <article className='p-2 xl:p-9 mt-4'>
    <Routes>
      <Route path="/" element={
        <>
          <Helmet>
            <title>Guide</title>
            <meta name="description" content="Bem-vindo à minha página inicial" />
          </Helmet>
          <HomePage />
        </>
      } />
      <Route path="/docs/:spec/:id" element={
        <DocPage />
      } />
      <Route path="/search" element={
        <SearchPage />
      } />
    </Routes>
  </article>
)

const ButtonSearch = (<Link to="/search">
  <Button variant={'ghost'}>
    <Search />
    Pesquisar
    <kbd className="shortcut">
      <span className="text-xs">⌘</span>K
    </kbd>
  </Button>
</Link>)

function HeaderContentLeft(globalState: GlobalState) {
  return <div className='gde-appbar--left'>
    <SidebarTrigger />
    <kbd className="shortcut mr-4">
      <span className="text-xs">⌘</span>B
    </kbd>
    {Branding(globalState)}
  </div>;
}

function HeaderContentRight() {
  return <div className='gde-appbar--right'>
    {ButtonSearch}
  </div>;
}
function Branding(globalState: GlobalState) {
  return <div className="flex items-center gap-4 leading-none">
    <Logo />
    <span className="font-bold text-xl -mt-1">|</span>
    <span className="font-bold text-xl">{globalState.branding.name}</span>
  </div>;
}

function Header(globalState: GlobalState) {
  return <header className='gde-appbar'>
    {HeaderContentLeft(globalState)}
    {HeaderContentRight()}
  </header>;
}

const App: React.FC = () => {
  const { globalState } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        navigate("/search")
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [navigate])
  return (
    <div className={`gde-app ${globalState.theme}`}>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>
          {Header(globalState)}
          {Page}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default App;

