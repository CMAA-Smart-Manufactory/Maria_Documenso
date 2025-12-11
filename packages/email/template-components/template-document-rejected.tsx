import { Trans } from '@lingui/react/macro';

import { Button, Heading, Text } from '../components';

export interface TemplateDocumentRejectedProps {
  documentName: string;
  recipientName: string;
  rejectionReason?: string;
  documentUrl: string;
}

export function TemplateDocumentRejected({
  documentName,
  recipientName: signerName,
  rejectionReason,
  documentUrl,
}: TemplateDocumentRejectedProps) {
  return (
    <div className="mt-4">
      <Heading className="mb-4 text-center text-2xl font-semibold text-slate-800">
        <Trans>Documento rejeitado</Trans>
      </Heading>

      <Text className="mb-4 text-base">
        <Trans>
          {signerName} rejeitou o documento "{documentName}".
        </Trans>
      </Text>

      {rejectionReason && (
        <Text className="mb-4 text-base text-slate-400">
          <Trans>Motivo da rejeição: {rejectionReason}</Trans>
        </Text>
      )}

      <Text className="mb-6 text-base">
        <Trans>Você pode visualizar o documento e seu status clicando no botão abaixo.</Trans>
      </Text>

      <Button
        href={documentUrl}
        className="inline-flex items-center justify-center rounded-lg bg-documenso-500 px-6 py-3 text-center text-sm font-medium text-black no-underline"
      >
        <Trans>Ver documento</Trans>
      </Button>
    </div>
  );
}
