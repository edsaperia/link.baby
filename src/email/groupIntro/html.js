export default () => `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="x-apple-disable-message-reformatting" />
<title>Join $data.groupName on Link Baby</title>
<style media="all" type="text/css">
@import url(http://link.baby/fonts.css);

@media only screen {
  .container {
    padding: 10px;
  }
}


@media only screen {
  .content {
    padding: 10px;
  }
}

@media only screen and (max-width: 620px) {
  table[class=body] h1,
  table[class=body] h2,
  table[class=body] h3,
  table[class=body] h4 {
    font-weight: 600 !important;
  }
  table[class=body] h1 {
    font-size: 22px !important;
  }
  table[class=body] h2 {
    font-size: 18px !important;
  }
  table[class=body] h3 {
    font-size: 16px !important;
  }
  table[class=body] .content,
  table[class=body] .wrapper {
    padding: 10px !important;
  }
  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }
  table[class=body] .btn table,
  table[class=body] .btn a {
    width: 100% !important;
  }
}


@media only screen and (max-width: 620px) {
  .header {
    margin-bottom: 10px !important;
    margin-top: 20px !important;
  }
  table[class=body] .wrapper {
    padding: 40px 20px !important;
  }
}


@media only screen and (max-width: 620px) {
  .main.signup .panel:nth-of-type(2),
    .main.signup .panel:nth-of-type(3) {
    padding-bottom: 10px !important;
  }
}


@media only screen and (max-width: 620px) {
  .main.signup .panel:nth-of-type(1) img.intro {
    width: 120px !important;
  }
}


@media only screen and (max-width: 620px) {
  .main.welcome .panel-intro img.intro {
    width: 120px !important;
  }
}


@media only screen and (max-width: 620px) {
  .main.welcome .panel:not(.panel-intro) {
    padding-bottom: 10px !important;
  }
}


@media only screen and (max-width: 620px) {
  .no-media-query {
    display: none !important;
  }
  .small-screen-block {
    width: 100% !important;
    height: auto !important;
    overflow: inherit !important;
    float: none !important;
    display: block !important;
    max-height: none !important;
    position: relative !important;
  }
}


@media only screen {
  .media-query-available--inline {
    width: auto !important;
    min-height: auto !important;
    overflow: auto !important;
    float: none !important;
    display: inline !important;
    max-height: auto !important;
  }
  .media-query-not-vailable {
    display: none !important;
  }
}
</style>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "EmailMessage",
  "potentialAction": {
    "@type": "ViewAction",
    "target": "${process.env.WEB_PUBLIC_ROOT}/login/callback?accessToken=$data.accessToken",
    "name": "Join"
  },
  "description": "Join Link Baby"
}
</script>
</head>

<body style="margin: 0; font-family: ApercuBold, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100% !important; line-height: 1.6em; -webkit-font-smoothing: antialiased; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100% !important; background-color: white;">

<table class="body" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: white;" width="100%" bgcolor="white">
<tr>
<td style="box-sizing: border-box; font-family: ApercuBold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top"></td>
<td class="container" style="box-sizing: border-box; font-family: ApercuBold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto !important; max-width: 580px; padding: 10px 0; width: 580px;" width="580" valign="top">
<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px 0;">

<div class="header" style="box-sizing: border-box; margin-bottom: 10px; margin-top: 0; width: 100%;">
  <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
    <tr>
      <td style="box-sizing: border-box; font-family: ApercuBold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top">
        <a href="https://link.baby" target="_blank" style="box-sizing: border-box; color: #EF4089; text-decoration: underline;">
          <img src="http://link.baby/logo.png" height="64" alt="link.baby Logo" style="-ms-interpolation-mode: bicubic; max-width: 100%;">
        </a>
      </td>
    </tr>
  </table>
</div>

<table class="main login" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border: none; border-radius: 3px; font-size: 15px; line-height: 24px;" width="100%">
  <tr>
    <td class="panel panel-dark" style="box-sizing: border-box; font-family: ApercuBold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; vertical-align: top; border-radius: 8px; margin-top: 0; font-size: 15px; background-color: #fff; color: white; padding: 60px 20px; padding-bottom:25px; border: 1px solid black; color: black;" valign="top" bgcolor="#fff">
      <table style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
        <tr>
          <td style="box-sizing: border-box; font-family: ApercuBold, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top;" valign="top">

            Hi,
            <br /><br />
            $data.senderName invites you to stay connected with others in the $data.groupName group on link.baby
            <br /><br />
            A message from $data.senderName:<br />
            $data.introEmailContent<br />
            <br />
            So how does this work?<br />
            If you fill out a small profile on link.baby then you'll recieve daily emails with the profile of someone else in the $data.groupName group.<br />
            You can opt out at any time by clicking the opt-out link in the email.<br />
            <br /><br />
            <table class="btn btn-primary" cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; margin: auto;" width="100%">
              <tr>
                <td align="center" style="box-sizing: border-box; font-family: ApercuRegular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                  <table cellpadding="0" cellspacing="0" class="btn-inner-table" style="box-sizing: border-box; border-collapse: separate !important; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                    <tr>
                      <td style="box-sizing: border-box; font-family: ApercuRegular, 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 14px; vertical-align: top; background-color: #EF4089; border-radius: 5px; text-align: center;" valign="top" bgcolor="#EF4089" align="center">
                        <a href="${process.env.WEB_PUBLIC_ROOT}/login/callback?accessToken=$data.accessToken" style="font-family: 'ApercuRegular'; box-sizing: border-box; line-height: 22px; text-decoration: none; background-color: black; border: solid 1px black; border-radius: 5px; cursor: pointer; color: white; font-size: 17px; font-weight: 700; margin: 0; padding: 12px 38px; text-transform: none; border-color: black; display: inline-block; font-weight: bold;">
                         Get Started
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</div>
</td>
</tr>
</table>

            <p style="font-size: 11px; color: #333; font-family:'ApercuRegular'; text-align: center;">
            You are recieving this email because $data.senderName added you to the "$data.groupName" group on link.baby.<br />
            You will not recieve any more emails from the "$data.groupName" group on link.baby unless you opt-in via the link above.
            </p>
</body>
</html>

`
