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
import { BookOpenText, Menu, Megaphone, MoonStar, Search, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { useEffect, useState } from 'react';
import HomePage from './pages/home';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList,
} from './components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./components/ui/sheet";


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

const SearchButton = ({ className = "" }) => (
  <Link to="/guide/search">
    <Button variant="ghost" className={`${className}`}>
      <Search className="h-5 w-5 mr-2" />
      <span className="hidden md:inline">Pesquisar</span>
      <kbd className="hidden md:inline-flex ml-2 items-center gap-1 rounded border px-1.5 text-xs">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  </Link>
);

function HeaderContentLeft(globalState: GlobalState) {
  return <div className='gde-appbar--left'>
    <SidebarTrigger className='mr-3' />
    {Branding(globalState)}
  </div>;
}

function HeaderContentRight() {
  const { globalState, setGlobalState } = useGlobalContext();
  const [open, setOpen] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = globalState.theme === 'dark' ? 'light' : 'dark';
    
    // Salva no localStorage
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o estado global
    setGlobalState((state) => ({
      ...state, theme: newTheme,
    }));
    
    // Aplica imediatamente ao DOM
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    root.setAttribute('data-theme', newTheme);
  }
  
  return (
    <div className='gde-appbar--right'>
      {/* Desktop Navigation - visível apenas em desktop */}
      <div className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/guide/pages/readme" className="flex items-center gap-2 px-3 py-2">
                <BookOpenText className="h-5 w-5" />
                Readme
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/guide/pages/changelog" className="flex items-center gap-2 px-3 py-2">
                <Megaphone className="h-5 w-5" />
                Changelog
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <SearchButton />
        
        <Button variant="ghost" onClick={toggleTheme} size="icon">
          {globalState.theme === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile Navigation - visível apenas em mobile */}
      <div className="flex md:hidden">
        <SearchButton className="mr-1" />
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] sheet-content">
            <div className="grid gap-4 py-4">
              <Link 
                to="/guide/pages/readme" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setOpen(false)}
              >
                <BookOpenText className="h-5 w-5" />
                Readme
              </Link>
              <Link 
                to="/guide/pages/changelog" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setOpen(false)}
              >
                <Megaphone className="h-5 w-5" />
                Changelog
              </Link>
              <Link 
                to="/guide/search" 
                className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md"
                onClick={() => setOpen(false)}
              >
                <Search className="h-5 w-5" />
                Pesquisar
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => {
                  toggleTheme();
                  setOpen(false);
                }} 
                className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-accent rounded-md text-left"
              >
                {globalState.theme === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
                Modo {globalState.theme === 'dark' ? 'Claro' : 'Escuro'}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function Branding(globalState: GlobalState) {
  return <Link to="/guide/" className="flex items-center gap-4 leading-none">
    <Logo />
    <span className="branding-name hidden sm:inline">{globalState.branding.name}</span>
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
    // Lê o tema do localStorage ou usa 'light' como padrão
    const theme = (localStorage.getItem('theme') || 'light') as GlobalState['theme'];
    localStorage.setItem('theme', theme);
    
    // Aplica o tema ao documento HTML
    const root = window.document.documentElement;
    
    // Remove ambas as classes para garantir que não haja conflito
    root.classList.remove('dark', 'light');
    
    // Adiciona a classe do tema atual
    root.classList.add(theme);
    
    // Define o atributo data-theme para temas do shadcn
    root.setAttribute('data-theme', theme);
    
    setGlobalState((state) => ({
      ...state, theme
    }));
  }, [setGlobalState]);
  
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
    <div className="gde-app">
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

