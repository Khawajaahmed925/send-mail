// Required dependency
const axios = require('axios');

exports.handler = async function(event, context) {
  // Get the email from the incoming request body
  const { email } = JSON.parse(event.body);
  
  // Webhook URL (replace with your Make.com webhook URL)
  const webhookUrl = "https://hook.us2.make.com/zs2p9ccv5zfuubtjzkrs2rsswiw3vdky";

  // Check if email is provided
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email is required" }),
    };
  }

  try {
    // Send the email to the Make.com webhook
    const response = await axios.post(webhookUrl, { email: email });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", data: response.data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email", error: error.message }),
    };
  }
};
