import { useEffect, useState } from 'react';

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import type { Recipient } from '@prisma/client';
import { RecipientRole } from '@prisma/client';
import { useSearchParams } from 'react-router';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { formatSigningLink } from '@documenso/lib/utils/recipients';
import { CopyTextButton } from '@documenso/ui/components/common/copy-text-button';
import { AvatarWithText } from '@documenso/ui/primitives/avatar';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@documenso/ui/primitives/dialog';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { QRCodeSVG } from 'qrcode.react';

/**
 * Hook corrigido para funcionar em http://
 */
function useCopyToClipboard(): [string | null, (text: string) => void] {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(text);
      }).catch(() => {
        // fallback para http://
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
          setCopiedText(text);
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textarea);
      });
    } else {
      // se não existir navigator.clipboard
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setCopiedText(text);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textarea);
    }
  };

  return [copiedText, copy];
}

export type DocumentRecipientLinkCopyDialogProps = {
  trigger?: React.ReactNode;
  recipients: Recipient[];
};

export const DocumentRecipientLinkCopyDialog = ({
  trigger,
  recipients,
}: DocumentRecipientLinkCopyDialogProps) => {
  const { _ } = useLingui();
  const { toast } = useToast();

  const [, copy] = useCopyToClipboard();

  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const actionSearchParam = searchParams?.get('action');

  const onBulkCopy = () => {
    const generatedString = recipients
      .filter((recipient) => recipient.role !== RecipientRole.CC)
      .map(
        (recipient) =>
          `${recipient.email}\n${NEXT_PUBLIC_WEBAPP_URL()}/sign/${recipient.token}`,
      )
      .join('\n\n');

    copy(generatedString);

    toast({
      title: _(msg`Copied to clipboard`),
      description: _(msg`All signing links have been copied to your clipboard.`),
    });
  };

  useEffect(() => {
    if (actionSearchParam === 'view-signing-links') {
      setOpen(true);
      // aqui você pode limpar o search param se tiver hook próprio
    }
  }, [actionSearchParam]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>

      <DialogContent position="center">
        <DialogHeader>
          <DialogTitle className="pb-0.5">
            <Trans>Copy Signing Links</Trans>
          </DialogTitle>

          <DialogDescription>
            <Trans>
              You can copy and share these links to recipients so they can action the document.
            </Trans>
          </DialogDescription>
        </DialogHeader>

        <ul className="text-muted-foreground divide-y rounded-lg border">
          {recipients.length === 0 && (
            <li className="flex flex-col items-center justify-center py-6 text-sm">
              <Trans>No recipients</Trans>
            </li>
          )}

          {recipients.map((recipient) => (
            <li
              key={recipient.id}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <AvatarWithText
                avatarFallback={recipient.email.slice(0, 1).toUpperCase()}
                primaryText={
                  <p className="text-muted-foreground text-sm">{recipient.email}</p>
                }
                secondaryText={
                  <p className="text-muted-foreground/70 text-xs">
                    {_(RECIPIENT_ROLES_DESCRIPTION[recipient.role].roleName)}
                  </p>
                }
              />

              {recipient.role !== RecipientRole.CC && (
                <div className="flex gap-2">
                  <CopyTextButton
                    value={formatSigningLink(recipient.token)}
                    onCopySuccess={() => {
                      toast({
                        title: _(msg`Copied to clipboard`),
                        description: _(msg`The signing link has been copied to your clipboard.`),
                      });
                    }}
                    badgeContentUncopied={
                      <p className="ml-1 text-xs">
                        <Trans>Copy</Trans>
                      </p>
                    }
                    badgeContentCopied={
                      <p className="ml-1 text-xs">
                        <Trans>Copied</Trans>
                      </p>
                    }
                  />

                  {/* Botão para abrir QRCode */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trans>QRCode</Trans>
                      </Button>
                    </DialogTrigger>
                    <DialogContent position="center">
                      <DialogHeader>
                        <DialogTitle>
                          <Trans>QR Code</Trans>
                        </DialogTitle>
                        <DialogDescription>
                          <Trans>Escaneie para abrir o link de assinatura</Trans>
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex justify-center py-6">
                        <QRCodeSVG
                          value={formatSigningLink(recipient.token)}
                          size={200}
                          level="H"
                          includeMargin
                        />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            <Trans>Fechar</Trans>
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </li>
          ))}
        </ul>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              <Trans>Close</Trans>
            </Button>
          </DialogClose>

          <Button type="button" onClick={onBulkCopy}>
            <Trans>Bulk Copy</Trans>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
