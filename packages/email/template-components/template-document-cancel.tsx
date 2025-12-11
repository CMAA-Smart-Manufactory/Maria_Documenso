import { Trans } from '@lingui/react/macro';

import { Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export interface TemplateDocumentCancelProps {
  inviterName: string;
  inviterEmail: string;
  documentName: string;
  assetBaseUrl: string;
  cancellationReason?: string;
}

export const TemplateDocumentCancel = ({
  inviterName,
  documentName,
  assetBaseUrl,
  cancellationReason,
}: TemplateDocumentCancelProps) => {
  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section>
        <Text className="mx-auto mb-0 max-w-[80%] text-center text-lg font-semibold text-primary">
          <Trans>
            {inviterName} cancelou o documento
            <br />"{documentName}"
          </Trans>
        </Text>

        <Text className="my-1 text-center text-base text-slate-400">
          <Trans>Todas as assinaturas foram anuladas.</Trans>
        </Text>

        <Text className="my-1 text-center text-base text-slate-400">
          <Trans>Você não precisa mais assinar.</Trans>
        </Text>

        {cancellationReason && (
          <Text className="mt-4 text-center text-base">
            <Trans>Motivo do cancelamento: {cancellationReason}</Trans>
          </Text>
        )}
      </Section>
    </>
  );
};

export default TemplateDocumentCancel;
