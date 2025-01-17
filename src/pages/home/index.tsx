import { useIsMobile } from '@/hooks/use-mobile';
import { HomeDesktop } from './desktop';
import { HomeMobile } from './mobile';
import './style.css';

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    isMobile ? HomeMobile : HomeDesktop
  );
};

export default Home;
