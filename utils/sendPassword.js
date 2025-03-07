// Function to send a new password email using Brevo (Sendinblue)
const sendNewPasswordEmail = async (email, newPassword) => {
    // 1. Include the Brevo library
    const SibApiV3Sdk = require('sib-api-v3-sdk');
  
    // 2. Instantiate the client
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
  
    // 3. Configure the API key
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;  // Use environment variable for API key!
    const CORREO = process.env.EMAIL; 

    // 4. Create an instance of the Transactional Emails API
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  
    // 5. Create the SendSmtpEmail object
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
    // 6. Configure the email details
    sendSmtpEmail.subject = "Su nueva contraseña";
    sendSmtpEmail.sender = { "name": "FinanK", "email": CORREO}; // Replace with your app's name and email
    sendSmtpEmail.to = [{ "email": email }]; // Recipient email
    sendSmtpEmail.htmlContent = `<html><body><p>Su Nueva contraseña es: <strong>${newPassword}</strong></p>
                                      <p>Por favor, cambiela después de iniciar sesión.</p></body></html>`; // Email content
    sendSmtpEmail.textContent = `Su Nueva contraseña es: ${newPassword}. Por favor, cambiela después de iniciar sesión.`;
  
    // 7. Send the email
    try {
      const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log("Brevo email sent successfully!", data);  // Log success
      return data; // Return the result for handling
    } catch (error) {
      console.error("Error sending email with Brevo:", error);
      throw error; // Re-throw the error to be handled upstream
    }
  };
  
  module.exports = { sendNewPasswordEmail };