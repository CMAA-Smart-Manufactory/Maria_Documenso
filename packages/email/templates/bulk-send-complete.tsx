import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Body, Container, Head, Html, Preview, Section, Text } from '../components';
import { TemplateFooter } from '../template-components/template-footer';

export interface BulkSendCompleteEmailProps {
  userName: string;
  templateName: string;
  totalProcessed: number;
  successCount: number;
  failedCount: number;
  errors: string[];
  assetBaseUrl?: string;
}

export const BulkSendCompleteEmail = ({
  userName,
  templateName,
  totalProcessed,
  successCount,
  failedCount,
  errors,
}: BulkSendCompleteEmailProps) => {
  const { _ } = useLingui();

  return (
    <Html>
      <Head />
      <Preview>{_(msg`Bulk send operation complete for template "${templateName}"`)}</Preview>
      <Body className="mx-auto my-auto bg-white font-sans">
        <Section>
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 p-4 backdrop-blur-sm">
            <Section>
              <Text className="text-sm">
                <Trans>Olá {userName},</Trans>
              </Text>

              <Text className="text-sm">
                <Trans>
                  Sua operação de envio em massa para o modelo "{templateName}" foi concluído.
                </Trans>
              </Text>

              <Text className="text-lg font-semibold">
                <Trans>Resumo:</Trans>
              </Text>

              <ul className="my-2 ml-4 list-inside list-disc">
                <li>
                  <Trans>Total de linhas processadas:: {totalProcessed}</Trans>
                </li>
                <li className="mt-1">
                  <Trans>Criado com sucesso: {successCount}</Trans>
                </li>
                <li className="mt-1">
                  <Trans>Failed: {failedCount}</Trans>
                </li>
              </ul>

              {failedCount > 0 && (
                <Section className="mt-4">
                  <Text className="text-lg font-semibold">
                    <Trans>Ocorreram os seguintes erros:</Trans>
                  </Text>

                  <ul className="my-2 ml-4 list-inside list-disc">
                    {errors.map((error, index) => (
                      <li key={index} className="mt-1 text-sm text-destructive text-slate-400">
                        {error}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              <Text className="text-sm">
                <Trans>
                  Você pode visualizar os documentos criados no seu painel na seção "Documentos
                  criados a partir do modelo".
                </Trans>
              </Text>
            </Section>
          </Container>

          <Container className="mx-auto max-w-xl">
            <TemplateFooter isDocument={false} />
          </Container>
        </Section>
      </Body>
    </Html>
  );
};
