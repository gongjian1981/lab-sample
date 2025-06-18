

export function sendEmail(emailAddress: string, content: string): boolean {
  console.log(`Sending email to ${emailAddress} with content: ${content}`);
  return true;
}