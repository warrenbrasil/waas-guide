import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeMobile = <div className="mobile home-page">
  <div className="home-hero px-4 py-10">
    <div>
      <h1 className='home-hero--title mb-5'>
        Wealth<br />Management as a Service
      </h1>
      <p className="home-hero--subtitle mb-3">
        Construir uma plataforma de investimentos toma tempo,
        mas não precisa ser o seu
      </p>
      <div className="home-hero--description text-muted-foreground mb-8">
        Inovação para os nossos parceiros
      </div>
      <div className="home-hero--buttons">
        <Link to="/pages/readme" className="btn-primary">Guia de Início</Link>
      </div>
    </div>
  </div>
  <div className="home-features py-8 grid gap-4">
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

export { HomeMobile };