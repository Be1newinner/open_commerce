import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pydantic import BaseModel
from app.config import SMTP_EMAIL, SMTP_PASSWORD

async def send_email(recipient_email: str, subject: str, body: str):
    """
    Sends an email to the specified recipient with the given subject and body.
    
    Parameters:
        recipient_email (str): The email address of the recipient.
        subject (str): The subject line of the email.
        body (str): The content of the email body.
    
    Returns:
        None
    
    Raises:
        smtplib.SMTPException: If there is an error during the email sending process.
    """
    sender_email = SMTP_EMAIL
    sender_password = SMTP_PASSWORD
    
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = recipient_email
    msg["Subject"] = subject
    
    msg.attach(MIMEText(body, 'plain'))
    
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()

async def forgot_password_email_send(email:str, reset_link:str):
    await send_email(email, "Password Reset for Open Commerce", f"Click here to reset your password: {reset_link}")
