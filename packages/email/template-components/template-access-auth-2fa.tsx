import { Plural, Trans } from '@lingui/react/macro';

import { Heading, Img, Section, Text } from '../components';

export type TemplateAccessAuth2FAProps = {
  documentTitle: string;
  code: string;
  userEmail: string;
  userName: string;
  expiresInMinutes: number;
  assetBaseUrl?: string;
};

export const TemplateAccessAuth2FA = ({
  documentTitle,
  code,
  userName,
  expiresInMinutes,
  assetBaseUrl = 'http://localhost:3002',
}: TemplateAccessAuth2FAProps) => {
  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return (
    <div>
      <Img src={getAssetUrl('/static/document.png')} alt="Document" className="mx-auto h-12 w-12" />

      <Section className="mt-8">
        <Heading className="text-center text-lg font-semibold text-slate-900">
          <Trans>Código de verificação necessário</Trans>
        </Heading>

        <Text className="mt-2 text-center text-slate-700">
          <Trans>
            Hi {userName}, Você precisa inserir um código de verificação para concluir o documento "
            {documentTitle}".
          </Trans>
        </Text>

        <Section className="mt-6 rounded-lg bg-slate-50 p-6 text-center">
          <Text className="mb-2 text-sm font-medium text-slate-600">
            <Trans>Seu código de verificação:</Trans>
          </Text>
          <Text className="text-2xl font-bold tracking-wider text-slate-900">{code}</Text>
        </Section>

        <Text className="mt-4 text-center text-sm text-slate-600">
          <Plural
            value={expiresInMinutes}
            one="This code will expire in # minute."
            other="This code will expire in # minutes."
          />
        </Text>

        <Text className="mt-4 text-center text-sm text-slate-500">
          <Trans>
            Se você não solicitou este código de verificação, pode ignorar este e-mail sem
            problemas.
          </Trans>
        </Text>
      </Section>
    </div>
  );
};
