import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// New component for Onboarding Benefits
const OnboardingBenefits = () => {
  return (
    <div className="onboarding-benefits max-w-6xl mx-auto grid grid-cols-2 gap-6 px-8 py-16">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Redução de burocracia</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex-grow">
          <p>Um cadastro ágil que minimiza barreiras de entrada para novos clientes.</p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Rápida adequação regulatória</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex-grow">
          <p>Conformidade com as normas da CVM desde o primeiro passo.</p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Confiança e credibilidade</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex-grow">
          <p>Um processo que transmite segurança aos clientes e aos reguladores.</p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Escalabilidade</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex-grow">
          <p>A solução foi pensada para crescer junto com sua base de usuários, mantendo os mais altos padrões de segurança e auditoria.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const HomeDesktop = <div className="home-page desktop">
  <div className="home-hero max-w-5xl mx-auto py-16">
    <div>
      <h1 className='home-hero--title text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-transparent bg-clip-text mb-6'>
        Wealth<br />Management as a Service
      </h1>
      <p className="home-hero--subtitle mb-4">
        Construir uma plataforma de investimentos toma tempo,<br />
        mas não precisa ser o seu
      </p>
      <div className="home-hero--description text-muted-foreground text-lg mb-10">
        Inovação para os nossos parceiros
      </div>
      <div className="home-hero--buttons flex gap-4">
        <Link to="/pages/readme" className="btn-primary">Guia de Início</Link>
      </div>
    </div>
  </div>
  <div className="home-features max-w-6xl mx-auto grid grid-cols-4 gap-6 px-8 pb-16">
    <Link to="/pages/onboarding" className="flex">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Cadastro</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex-grow">
          <p>Nosso cadastro garante uma experiência simples, guiando o cliente na configuração e uso inicial da plataforma.</p>
          <Button variant="link" className="p-0 text-muted-foreground mt-auto">
            <InfoIcon className="w-4 h-4" />
            Saiba mais
          </Button>
        </CardContent>
      </Card>
    </Link>
    <Link to="/pages/transactions" className="flex">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Transações</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground flex-grow">
        <p>As transações são operações financeiras seguras e rápidas, garantindo confiança e controle ao cliente sobre suas movimentações.</p>
        <Button variant="link" className="p-0 text-muted-foreground mt-auto">
          <InfoIcon className="w-4 h-4" />
          Saiba mais
        </Button>
        </CardContent>
      </Card>
    </Link>
    <Link to="/pages/account-rendering" className="flex">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Prestação de Contas</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground flex-grow">
          <p>A prestação de contas oferece relatórios detalhados das atividades financeiras, garantindo transparência e permitindo o acompanhamento claro de cada operação.</p>
          <Button variant="link" className="p-0 text-muted-foreground mt-auto">
            <InfoIcon className="w-4 h-4" />
            Saiba mais
          </Button>
        </CardContent>
      </Card>
    </Link>
    <Link to="/pages/portfolios" className="flex">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className='h5'>Carteiras</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground flex-grow">
          <p>Invista de forma estratégica com carteiras personalizadas para seus objetivos, gestão ativa e total transparência, sempre focando no que é melhor para você.</p>
          <Button variant="link" className="p-0 text-muted-foreground mt-auto">
            <InfoIcon className="w-4 h-4" />
            Saiba mais
          </Button>
        </CardContent>
      </Card>
    </Link>
  </div>
</div>;

export { HomeDesktop, OnboardingBenefits };