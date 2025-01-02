import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '@/utils';
import { useOperationFilter } from '@/hooks/useOperationFilter';
import { useFetchDoc } from '@/hooks/useFetchDoc';
import { DocParams } from '@/types';
import Operation from './operation';
import './styles.css';

const DocPage: React.FC = () => {
  const { id = '', spec = '' } = useParams<DocParams>();
  const { globalState } = useGlobalContext();
  const findOperation = useOperationFilter();
  const specURL = useMemo(() => globalState.specs[spec], [globalState.specs, spec]);
  const { doc, openapi } = useFetchDoc(specURL, id, findOperation);

  return (Operation({ doc, openapi }));
};

export default DocPage;
