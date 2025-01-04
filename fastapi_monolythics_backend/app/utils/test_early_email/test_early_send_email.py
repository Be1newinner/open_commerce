import pytest
from unittest.mock import patch, MagicMock
from app.utils.email import send_email

@pytest.mark.describe("send_email function")
class TestSendEmail:
    
    @pytest.mark.happy_path
    @pytest.mark.asyncio
    async def test_send_email_success(self):
        """Test that send_email successfully sends an email with valid inputs."""
        recipient_email = "test@example.com"
        subject = "Test Subject"
        body = "This is a test email body."

        with patch("smtplib.SMTP") as mock_smtp:
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__.return_value = mock_server

            await send_email(recipient_email, subject, body)

            mock_smtp.assert_called_once_with('smtp.gmail.com', 587)
            mock_server.starttls.assert_called_once()
            mock_server.login.assert_called_once_with("aeronamyrai@gmail.com", "eqrq npab qnuq dpou")
            mock_server.sendmail.assert_called_once_with(
                "aeronamyrai@gmail.com", recipient_email, 
                f"Content-Type: multipart/mixed; boundary=\"===============\"\nMIME-Version: 1.0\nFrom: aeronamyrai@gmail.com\nTo: {recipient_email}\nSubject: {subject}\n\n--===============\nContent-Type: text/plain; charset=\"us-ascii\"\nMIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\n\n{body}\n--===============--\n"
            )
            mock_server.quit.assert_called_once()

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_send_email_empty_subject(self):
        """Test that send_email handles an empty subject gracefully."""
        recipient_email = "test@example.com"
        subject = ""
        body = "This is a test email body."

        with patch("smtplib.SMTP") as mock_smtp:
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__.return_value = mock_server

            await send_email(recipient_email, subject, body)

            mock_server.sendmail.assert_called_once_with(
                "aeronamyrai@gmail.com", recipient_email, 
                f"Content-Type: multipart/mixed; boundary=\"===============\"\nMIME-Version: 1.0\nFrom: aeronamyrai@gmail.com\nTo: {recipient_email}\nSubject: \n\n--===============\nContent-Type: text/plain; charset=\"us-ascii\"\nMIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\n\n{body}\n--===============--\n"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_send_email_empty_body(self):
        """Test that send_email handles an empty body gracefully."""
        recipient_email = "test@example.com"
        subject = "Test Subject"
        body = ""

        with patch("smtplib.SMTP") as mock_smtp:
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__.return_value = mock_server

            await send_email(recipient_email, subject, body)

            mock_server.sendmail.assert_called_once_with(
                "aeronamyrai@gmail.com", recipient_email, 
                f"Content-Type: multipart/mixed; boundary=\"===============\"\nMIME-Version: 1.0\nFrom: aeronamyrai@gmail.com\nTo: {recipient_email}\nSubject: {subject}\n\n--===============\nContent-Type: text/plain; charset=\"us-ascii\"\nMIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\n\n{body}\n--===============--\n"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_send_email_invalid_email(self):
        """Test that send_email handles an invalid recipient email gracefully."""
        recipient_email = "invalid-email"
        subject = "Test Subject"
        body = "This is a test email body."

        with patch("smtplib.SMTP") as mock_smtp:
            mock_server = MagicMock()
            mock_smtp.return_value.__enter__.return_value = mock_server

            await send_email(recipient_email, subject, body)

            mock_server.sendmail.assert_called_once_with(
                "aeronamyrai@gmail.com", recipient_email, 
                f"Content-Type: multipart/mixed; boundary=\"===============\"\nMIME-Version: 1.0\nFrom: aeronamyrai@gmail.com\nTo: {recipient_email}\nSubject: {subject}\n\n--===============\nContent-Type: text/plain; charset=\"us-ascii\"\nMIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\n\n{body}\n--===============--\n"
            )