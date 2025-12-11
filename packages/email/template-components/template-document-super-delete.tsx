import { Trans } from '@lingui/react/macro';

import { Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export interface TemplateDocumentDeleteProps {
  reason: string;
  documentName: string;
  assetBaseUrl: string;
}

export const TemplateDocumentDelete = ({
  reason,
  documentName,
  assetBaseUrl,
}: TemplateDocumentDeleteProps) => {
  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section>
        <Text className="mb-0 mt-6 text-left text-lg font-semibold text-primary">
          <Trans>Seu documento foi excluído por um administrador!</Trans>
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base text-slate-400">
          <Trans>"{documentName}" Foi excluído por um administrador.</Trans>
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base text-slate-400">
          <Trans>
            Este documento não pode ser recuperado. Se desejar contestar o motivo para documentos
            futuros, entre em contato com o suporte.
          </Trans>
        </Text>

        <Text className="mx-auto mt-1 text-left text-base text-slate-400">
          <Trans>O motivo apresentado para a exclusão é o seguinte:</Trans>
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base italic text-slate-400">
          {reason}
        </Text>
      </Section>
    </>
  );
};

export default TemplateDocumentDelete;
