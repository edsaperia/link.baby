export default () => `
Hi $data.recipientName,

$data.senderName invites you to stay connected with others in the $data.groupName group on link.baby

A message from $data.senderName:
$data.introEmailContent

So how does this work?
If you fill out a small profile on link.baby then you'll recieve daily emails with the profile of someone else in the $data.groupName group.
You can opt out at any time by clicking the opt-out link in the email.

<a href="${process.env.WEB_PUBLIC_ROOT}/member?accessToken=$data.accessToken">sign up</a>

You are recieving this email because $data.senderName added you to the $data.groupName group on link.baby.
You will not recieve any more emails from the $data.groupName group on link.baby unless you opt-in via the link above.
`
