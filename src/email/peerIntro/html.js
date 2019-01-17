export default () => `
$data.senderName invites you to stay connected with others in the $data.groupName group on link.baby
<br /><br />
A message from $data.senderName:<br />
$data.introEmailContent<br />
<br /><br />
So how does this work?<br />
If you fill out a small profile on link.baby then you'll recieve daily emails with the profile of someone else in the $data.groupName group.<br />
You can opt out at any time by clicking the opt-out link in the email.<br />
<br /><br />
<a href="${process.env.WEB_PUBLIC_ROOT}/login/callback?accessToken=$data.accessToken">Get Started</a><br />
<br /><br />
You are recieving this email because $data.senderName added you to the "$data.groupName" group on link.baby.<br />
You will not recieve any more emails from the "$data.groupName" group on link.baby unless you opt-in via the link above.
`
