import { Trans } from '@lingui/react/macro';

import { Container, Heading, Section, Text } from '../components';

interface TemplateDocumentRejectionConfirmedProps {
  recipientName: string;
  documentName: string;
  documentOwnerName: string;
  reason?: string;
}

export function TemplateDocumentRejectionConfirmed({
  recipientName,
  documentName,
  documentOwnerName,
  reason,
}: TemplateDocumentRejectionConfirmedProps) {
  return (
    <Container>
      <Section>
        <Heading className="text-2xl font-semibold">
          <Trans>Rejeição confirmada</Trans>
        </Heading>

        <Text className="text-base text-primary">
          <Trans>
            Este e-mail confirma que você rejeitou o documento.{' '}
            <strong className="font-bold">"{documentName}"</strong> enviado por {documentOwnerName}.
          </Trans>
        </Text>

        {reason && (
          <Text className="text-base font-medium text-slate-400">
            <Trans>Motivo da rejeição: {reason}</Trans>
          </Text>
        )}

        <Text className="text-base">
          <Trans>
            O proprietário do documento foi notificado desta rejeição. Nenhuma ação adicional é
            necessária da sua parte neste momento. O proprietário do documento poderá entrar em
            contato com você caso tenha alguma dúvida sobre esta rejeição.
          </Trans>
        </Text>
      </Section>
    </Container>
  );
}
