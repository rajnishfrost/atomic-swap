const email_verification = (link) => {
    return (
      `<!DOCTYPE html>` +
      `<html>` +
      ` <head>` +
      `<title>Verify Email</title>` +
      `</head>` +
      ` <body style="background-color: #FEE12B;">` +
      `<header>` +
      `<h1 style="text-align: center;">Atomic Swap</h1>` +
      `</header>` +
      `<main>` +
      `<img src="https://bitpanda-academy.imgix.net/null1bc34fe8-19e0-4ab6-9cb0-6301bf37ed3c/bitpanda-academy-intermediate-24-atomic-swap-header-bg.png?auto=compress%2Cformat&fit=min&fm=jpg&q=80&w=1200" alt="Atomic Swap Image" style="width: 100%;">` +
      `<div style="text-align: center;">` +
      `<h2>{RESPONSE}</h2>` +
      `<button><a href=${link}>Verify Email</a></button>` +
      `</div>` +
      `</main>` +
      `<footer style="text-align: center;">` +
      `<p style="padding-bottom: 10px;">Copyright © 2023</p>` +
      `</footer>` +
      ` </body>` +
      ` </html>`
    );
  };
  export default email_verification;