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
import { BookOpenText, Megaphone, MoonStar, Search, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { useEffect } from 'react';
import HomePage from './pages/home';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './components/ui/navigation-menu';


const Page = (
  <article className='gde-page'>
    <Routes>
      <Route path="/guide" element={
        <>
          <HomePage />
        </>
      } />
      <Route path="/guide/pages/:page" element={
        <div className='markdown-page'>
          <MarkdownPage />
        </div>
      } />
      <Route path="/guide/docs/:spec/:id" element={
        <DocPage />
      } />
      <Route path="/guide/search" element={
        <SearchPage />
      } />
    </Routes>
  </article>
)

const ButtonSearch = (<Link to="/guide/search">
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
    <NavigationMenu className="mr-4 flex">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem>
          <Link to="/guide/pages/readme" className="flex items-center gap-2">
            <BookOpenText size="20" />
            Readme
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/guide/pages/changelog" className="flex items-center gap-2">
            <Megaphone size="20" />
            Changelog
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    {ButtonSearch}
    <Button variant="ghost" onClick={toggleTheme}>
      {globalState.theme === 'dark' ? <Sun /> : <MoonStar />}
    </Button>
  </div>;
}
function Branding(globalState: GlobalState) {
  return <Link to="/guide/" className="flex items-center gap-4 leading-none">
    <Logo />
    <span className="branding-name">{globalState.branding.name}</span>
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
        navigate("/guide/search")
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

