export default () => `
Hi $data.recipientName,

$data.subjectName from the $data.groupName group on link.baby

name: $data.subjectName
description: $data.subjectDescription

You can reply to this email and it'll go directly to them.

You are recieving this email because you opted to be introduced to people from the $data.groupName group on link.baby.
If you don't want to recieve these anymore you can <a href="${process.env.WEB_PUBLIC_ROOT}/member/opt-out?accessToken=$data.accessToken">opt out here</a>.
`