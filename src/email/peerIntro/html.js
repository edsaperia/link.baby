export default () => `
Hi $data.recipientName,
<br /><br />
$data.subjectName from the $data.groupName group on link.baby<br/>
<br/><br/>
name: $data.subjectName<br/>
description: $data.subjectDescription<br/>
<br/><br/>
You can reply to this email and it'll go directly to them.<br/>
<br/><br/>
You are recieving this email because you opted to be introduced to people from the $data.groupName group on link.baby.<br/>
If you don't want to recieve these anymore you can <a href="${process.env.WEB_PUBLIC_ROOT}/member/opt-out?accessToken=$data.accessToken">opt out here</a>.<br/>
`