import React, { useState } from 'react';
import { useFetchSpecs } from '@/components/sidebar/useFetchSpecs';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { OpenApiJson, Operation } from '@/types';
import { groupOperationsByTag } from '@/components/sidebar/groupOperationsByTag';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 font-bold text-yellow-800 rounded-md">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const countFilteredOperations = (spec: OpenApiJson, searchTerm: string) => {
  const group = groupOperationsByTag(spec);

  return Object.values(group).reduce((count, operations) => {
    const filteredOperations = operations.filter((operation) => {
      const summary = operation.details?.summary || '';
      const description = operation.details?.description || '';
      return findOperation(summary, searchTerm, description, operation);
    });
    return count + filteredOperations.length;
  }, 0);
};

const GroupedOperations = ({ spec, searchTerm }: { spec: OpenApiJson; searchTerm: string }) => {
  const group = groupOperationsByTag(spec);
  return (
    <div className="py-4">
      {Object.entries(group).map(([specKey, operations], index) => {
        const filteredOperations = filterOperations(operations, searchTerm);
        if (filteredOperations.length === 0) return null;
        return GroupedOperation(index, specKey, filteredOperations, spec, searchTerm);
      })}
    </div>
  );
};

const SearchEmptyMessage = <Alert className="search-empty--alert">
  <div>
    <Search className='w-10 h-10 text-cyan-800 dark:text-foreground' />
  </div>
  <div>
    <AlertTitle className='text-xl'>
      Inicie sua pesquisa
    </AlertTitle>
    <AlertDescription className='text-sm'>
      Por favor, digite um termo no campo acima para começar a buscar operações.
    </AlertDescription>
  </div>
</Alert>;

function SearchContent(
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  specs: OpenApiJson[]
): React.ReactNode {
  return <div className="max-w-7xl m-auto w-full dark:text-foreground p-4">
    <div className="grid md:grid-cols-[1fr_360px] gap-8">
      {SearchArea(searchTerm, setSearchTerm, specs)}
      {SearchSidebar(specs, searchTerm)}
    </div>
  </div>;
}

function SearchArea(
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  specs: OpenApiJson[]
) {
  return <div>
    {SearchInput(searchTerm, setSearchTerm)}
    {searchTerm ? (
      SearchResult(specs, searchTerm)
    ) : SearchEmptyMessage}
  </div>;
}

function SearchSidebar(specs: OpenApiJson[], searchTerm: string) {
  return <div className='hidden md:block'>
    <h3 className="text-xl font-bold">Especificações</h3>
    {Specifications(specs, searchTerm)}
  </div>;
}

function Specifications(specs: OpenApiJson[], searchTerm: string) {
  return specs.map((spec, index) => {
    const itemCount = countFilteredOperations(spec, searchTerm);
    return (
      <Card className="my-4" key={`spec-${index}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center h-9">
            {spec.info.title} {searchTerm && itemCount > 0 && <Badge className="rounded-full">{itemCount}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm line-clamp-6">
          {spec.info.description}
        </CardContent>
      </Card>
    );
  });
}

function SearchInput(searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>) {
  return <div className="flex items-center gap-2 relative mb-8 md:w-2/3 bg-muted">
    <Search className="w-4 h-4 text-gray-400 absolute left-4" />
    <Input
      placeholder="Digite um termo para pesquisar"
      className="pl-12 h-12"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
    {searchTerm && (
      <X
        className="w-4 h-4 text-gray-400 absolute right-4 cursor-pointer"
        onClick={() => setSearchTerm('')} />
    )}
  </div>;
}

function SearchResult(specs: OpenApiJson[], searchTerm: string) {
  return specs.map((spec) => (
    <div className="py-4 max-w-full" key={spec.info.title}>
      <div className="text-sm uppercase font-bold">{spec.info.title}</div>
      <GroupedOperations spec={spec} searchTerm={searchTerm} />
    </div>
  ));
}

function GroupedOperation(
  index: number,
  specKey: string,
  filteredOperations: Operation[],
  spec: OpenApiJson, searchTerm: string
) {
  return <div key={`group-${index}`}>
    <div className="text-xs uppercase font-semibold my-4">{specKey}</div>
    {filteredOperations.map((operation, index) => {
      const operationPath = `/docs/${spec.info.title.toLocaleLowerCase()}/${operation.details?.operationId}`;
      return OperationLink(index, operationPath, operation, searchTerm);
    })}
  </div>;
}

function OperationLink(
  index: number,
  operationPath: string,
  operation: Operation,
  searchTerm: string
) {
  return <Link
    key={`operation-${index}`}
    className="w-full flex items-center justify-between py-4 border-b-[1px]"
    to={operationPath}
  >
    <div className="md:pl-4">
      {HighlightSummary(operation, searchTerm)}
      {HighlightDescription(operation, searchTerm)}
      <div className="flex-col items-center gap-4 mt-4 md:flex">
        {HighlightPath(operation, searchTerm)}
        {HighlightTags(operation, searchTerm)}
      </div>
    </div>
    <span className={`method ${operation.method} md:mr-4 hidden md:inline`}>
      {highlightText(operation.method, searchTerm)}
    </span>
  </Link>;
}

function filterOperations(operations: Operation[], searchTerm: string) {
  return operations.filter((operation) => {
    const summary = operation.details?.summary || '';
    const description = operation.details?.description || '';
    return findOperation(summary, searchTerm, description, operation);
  });
}

function findOperation(
  summary: string,
  searchTerm: string,
  description: string,
  operation: Operation
): unknown {
  return foundSummary(summary, searchTerm) ||
    foundDescription(description, searchTerm) ||
    foundMethod(operation, searchTerm) ||
    foundPath(operation, searchTerm);
}

function foundPath(operation: Operation, searchTerm: string): unknown {
  return operation.path.toLowerCase().includes(searchTerm.toLowerCase());
}

function foundMethod(operation: Operation, searchTerm: string): unknown {
  return operation.method.toLowerCase().includes(searchTerm.toLowerCase());
}

function foundDescription(description: string, searchTerm: string): unknown {
  return description.toLowerCase().includes(searchTerm.toLowerCase());
}

function foundSummary(summary: string, searchTerm: string): unknown {
  return summary.toLowerCase().includes(searchTerm.toLowerCase());
}

function HighlightDescription(operation: Operation, searchTerm: string) {
  return <div className="text-xs text-gray-600">
    {highlightText(operation.details?.description || '', searchTerm)}
  </div>;
}

function HighlightSummary(operation: Operation, searchTerm: string) {
  return <span className="mr-4">
    {highlightText(operation.details?.summary || '', searchTerm)}
  </span>;
}

function HighlightTags(operation: Operation, searchTerm: string) {
  return <Badge variant="outline" className="rounded-full text-xs font-mono">
    {highlightText(operation.details?.tags.join(', ') || '', searchTerm)}
  </Badge>;
}

function HighlightPath(operation: Operation, searchTerm: string) {
  return <Badge variant="outline" className="rounded-full text-xs font-mono">
    {highlightText(operation.path, searchTerm)}
  </Badge>;
}

const SearchPage: React.FC = () => {
  const specs = useFetchSpecs();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    SearchContent(searchTerm, setSearchTerm, specs)
  );
};

export default SearchPage;
