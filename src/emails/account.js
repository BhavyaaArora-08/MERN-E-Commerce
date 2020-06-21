const sgMail = require("@sendgrid/mail");
const config = require("config");

sgMail.setApiKey(config.get("SENDGRID_API_KEY"));

const fromEmail = "akoreanyeoja@gmail.com";

const sendWelcomeEmail = (email, name) => {
  console.log("bye");
  sgMail.send({
    to: email,
    from: fromEmail,
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: fromEmail,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
