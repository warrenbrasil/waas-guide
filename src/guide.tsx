import { Route, Routes, useNavigate } from 'react-router-dom';
import MarkdownPage from '@/pages/page';
import DocPage from './pages/doc';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { AppSidebar } from './components/sidebar';
import { useGlobalContext } from "@/utils";
import Logo from './components/logo';
import { GlobalState } from './types';
import SearchPage from './pages/search';
import { Link } from 'react-router-dom';
import { MoonStar, Search, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { useEffect } from 'react';
import HomePage from './pages/home';


const Page = (
  <article className='gde-page'>
    <Routes>
      <Route path="/" element={
        <>
          <HomePage />
        </>
      } />
      <Route path="/pages/:page" element={
        <>
          <MarkdownPage />
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
    <SidebarTrigger className='mr-3' />
    {Branding(globalState)}
  </div>;
}

function HeaderContentRight() {
  const { globalState, setGlobalState } = useGlobalContext();
  const toggleTheme = () => {
    const theme = globalState.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    setGlobalState((state) => ({
      ...state, theme: theme,
    }));
  }
  return <div className='gde-appbar--right'>
    {ButtonSearch}
    <Button variant="ghost" onClick={toggleTheme}>
      {globalState.theme === 'dark' ? <Sun /> : <MoonStar />}
    </Button>
  </div>;
}
function Branding(globalState: GlobalState) {
  return <Link to="/" className="flex items-center gap-4 leading-none">
    <Logo />
    <span className="font-bold text-xl -mt-1">|</span>
    <span className="font-bold text-xl">{globalState.branding.name}</span>
  </Link>;
}

function Header(globalState: GlobalState) {
  return <header className='gde-appbar'>
    {HeaderContentLeft(globalState)}
    {HeaderContentRight()}
  </header>;
}

const App: React.FC = () => {
  const { globalState, setGlobalState } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const theme = (localStorage.getItem('theme') || 'light') as GlobalState['theme'];
    localStorage.setItem('theme', theme);
    setGlobalState((state) => ({
      ...state, theme
    }));
  }, [setGlobalState])
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        navigate("/search")
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [navigate, setGlobalState])
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

