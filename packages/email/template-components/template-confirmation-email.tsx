import { Trans } from '@lingui/react/macro';

import { Button, Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export type TemplateConfirmationEmailProps = {
  confirmationLink: string;
  assetBaseUrl: string;
};

export const TemplateConfirmationEmail = ({
  confirmationLink,
  assetBaseUrl,
}: TemplateConfirmationEmailProps) => {
  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section className="flex-row items-center justify-center">
        <Text className="mx-auto mb-0 max-w-[80%] text-center text-lg font-semibold text-primary">
          <Trans>Bem-vindo(a) ao Maria Sign!</Trans>
        </Text>

        <Text className="my-1 text-center text-base text-slate-400">
          <Trans>Antes de começar, confirme seu endereço de e-mail clicando no botão abaixo:</Trans>
        </Text>

        <Section className="mb-6 mt-8 text-center">
          <Button
            className="inline-flex items-center justify-center rounded-lg bg-documenso-500 px-6 py-3 text-center text-sm font-medium text-black no-underline"
            href={confirmationLink}
          >
            <Trans>Confirmar e-mail</Trans>
          </Button>
          <Text className="mt-8 text-center text-sm italic text-slate-400">
            <Trans>
              Você também pode copiar e colar este link no seu navegador {confirmationLink} (link
              expira em 1 hora)
            </Trans>
          </Text>
        </Section>
      </Section>
    </>
  );
};
