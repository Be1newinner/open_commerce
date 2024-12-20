import pytest
from unittest.mock import patch, AsyncMock
from app.utils.email import forgot_password_email_send

@pytest.mark.describe("forgot_password_email_send")
class TestForgotPasswordEmailSend:
    
    @pytest.mark.happy_path
    @pytest.mark.asyncio
    async def test_forgot_password_email_send_success(self):
        """
        Test that the forgot_password_email_send function calls send_email with correct parameters.
        """
        email = "test@example.com"
        reset_link = "http://example.com/reset?token=abc123"
        
        with patch('app.utils.email.send_email', new_callable=AsyncMock) as mock_send_email:
            await forgot_password_email_send(email, reset_link)
            mock_send_email.assert_awaited_once_with(
                email,
                "Password Reset for Open Commerce",
                f"Click here to reset your password: {reset_link}"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_forgot_password_email_send_empty_email(self):
        """
        Test that the forgot_password_email_send function handles an empty email string.
        """
        email = ""
        reset_link = "http://example.com/reset?token=abc123"
        
        with patch('app.utils.email.send_email', new_callable=AsyncMock) as mock_send_email:
            await forgot_password_email_send(email, reset_link)
            mock_send_email.assert_awaited_once_with(
                email,
                "Password Reset for Open Commerce",
                f"Click here to reset your password: {reset_link}"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_forgot_password_email_send_empty_reset_link(self):
        """
        Test that the forgot_password_email_send function handles an empty reset link.
        """
        email = "test@example.com"
        reset_link = ""
        
        with patch('app.utils.email.send_email', new_callable=AsyncMock) as mock_send_email:
            await forgot_password_email_send(email, reset_link)
            mock_send_email.assert_awaited_once_with(
                email,
                "Password Reset for Open Commerce",
                f"Click here to reset your password: {reset_link}"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_forgot_password_email_send_invalid_email_format(self):
        """
        Test that the forgot_password_email_send function handles an invalid email format.
        """
        email = "invalid-email-format"
        reset_link = "http://example.com/reset?token=abc123"
        
        with patch('app.utils.email.send_email', new_callable=AsyncMock) as mock_send_email:
            await forgot_password_email_send(email, reset_link)
            mock_send_email.assert_awaited_once_with(
                email,
                "Password Reset for Open Commerce",
                f"Click here to reset your password: {reset_link}"
            )

    @pytest.mark.edge_case
    @pytest.mark.asyncio
    async def test_forgot_password_email_send_long_email(self):
        """
        Test that the forgot_password_email_send function handles a very long email address.
        """
        email = "a" * 256 + "@example.com"
        reset_link = "http://example.com/reset?token=abc123"
        
        with patch('app.utils.email.send_email', new_callable=AsyncMock) as mock_send_email:
            await forgot_password_email_send(email, reset_link)
            mock_send_email.assert_awaited_once_with(
                email,
                "Password Reset for Open Commerce",
                f"Click here to reset your password: {reset_link}"
            )