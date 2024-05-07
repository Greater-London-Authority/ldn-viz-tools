export type PostMailOptions = {
  // Optional email address of a cc recipient. If this is form data being
  // entered by a user then it will likely be their email address so they
  // recieve a notification email.
  email?: string;
};

export type PostMail = (
  // App name as defined in the node-mailer config.
  app: string,
  // Title used in the email subject line.
  title: string,
  // Message to use as the email body.
  message: string | object,
  // Additional options.
  options: PostMailOptions
) => Promise<undefined>;

export const postMail: PostMail = (app, title, message, options = {}) => {
  const { email = 'noreply@london.gov.uk' } = options;

  const data = {
    correspondent: email,
    app,
    title,
    message
  };

  return fetch('https://apps.london.gov.uk/node-mailer/mail/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((res) => res.text())
    .then((text) => {
      // This is copied from older apps.
      if (text.includes('Message accepted for delivery')) {
        return;
      }
      throw new Error('Message could not be delivered or response lost in transmission');
    });
};
