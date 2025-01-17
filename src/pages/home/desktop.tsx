import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomeDesktop = <div className="home-page desktop">
  <div className="home-hero">
    <div>
      <h1 className='home-hero--title'>
        Guide
      </h1>
      <span className="home-hero--subtitle">
        let your <br className="hidden md:block" /> API speak for itself
      </span>
      <div className="home-hero--description">
        OpenAPI to Beautiful Docs in Minutes
      </div>
    </div>
  </div>
  <div className="home-features">
    <Card>
      <CardHeader>
        <CardTitle>Start with Open Source</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Get started with an open-source boilerplate designed for rapid OpenAPI documentation generation. Free, transparent, and community-driven.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Fast Setup, Instant Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Clone, configure, and generate. Transform OpenAPI JSON into elegant documentation pages in minutes with minimal setup.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Built to Extend</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Easily customize and expand. Add your branding, tweak layouts, or integrate with your favorite tools to suit your project's needs.</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Empowered by the Community</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Join a growing community of developers. Share ideas, contribute, and shape the evolution of Guide together.</p>
      </CardContent>
    </Card>
  </div>
</div>;

export { HomeDesktop };