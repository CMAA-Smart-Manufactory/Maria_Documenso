import { Trans } from '@lingui/react/macro';

import { Button, Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export type TemplateForgotPasswordProps = {
  resetPasswordLink: string;
  assetBaseUrl: string;
};

export const TemplateForgotPassword = ({
  resetPasswordLink,
  assetBaseUrl,
}: TemplateForgotPasswordProps) => {
  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section className="flex-row items-center justify-center">
        <Text className="mx-auto mb-0 max-w-[80%] text-center text-lg font-semibold text-primary">
          <Trans>Esqueceu sua senha?</Trans>
        </Text>

        <Text className="my-1 text-center text-base text-slate-400">
          <Trans>
            Não tem problema, isso acontece! Clique no botão abaixo para redefinir sua senha.
          </Trans>
        </Text>

        <Section className="mb-6 mt-8 text-center">
          <Button
            className="inline-flex items-center justify-center rounded-lg bg-documenso-500 px-6 py-3 text-center text-sm font-medium text-black no-underline"
            href={resetPasswordLink}
          >
            <Trans>Redefinir senha</Trans>
          </Button>
        </Section>
      </Section>
    </>
  );
};

export default TemplateForgotPassword;
