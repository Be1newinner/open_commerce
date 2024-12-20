import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.describe("Tests for http_exception_handler")
class TestHttpExceptionHandler:

    @pytest.mark.happy_path
    def test_http_exception_handler_with_404(self):
        """
        Test that the http_exception_handler correctly handles a 404 HTTPException.
        """
        response = client.get("/non-existent-endpoint")
        assert response.status_code == 404
        assert response.json() == {"message": "Not Found"}

    @pytest.mark.happy_path
    def test_http_exception_handler_with_401(self):
        """
        Test that the http_exception_handler correctly handles a 401 HTTPException.
        """
        response = client.get("/auth/protected-endpoint")  # Assuming this requires authentication
        assert response.status_code == 401
        assert response.json() == {"message": "Unauthorized"}

    @pytest.mark.edge_case
    def test_http_exception_handler_with_custom_status_code(self):
        """
        Test that the http_exception_handler correctly handles a custom HTTPException with a non-standard status code.
        """
        @app.get("/custom-error")
        async def custom_error():
            raise HTTPException(status_code=418, detail="I'm a teapot")

        response = client.get("/custom-error")
        assert response.status_code == 418
        assert response.json() == {"message": "I'm a teapot"}

    @pytest.mark.edge_case
    def test_http_exception_handler_with_empty_detail(self):
        """
        Test that the http_exception_handler correctly handles an HTTPException with an empty detail message.
        """
        @app.get("/empty-detail-error")
        async def empty_detail_error():
            raise HTTPException(status_code=400, detail="")

        response = client.get("/empty-detail-error")
        assert response.status_code == 400
        assert response.json() == {"message": ""}

    @pytest.mark.edge_case
    def test_http_exception_handler_with_large_detail(self):
        """
        Test that the http_exception_handler correctly handles an HTTPException with a very large detail message.
        """
        large_message = "A" * 10000  # 10,000 characters long
        @app.get("/large-detail-error")
        async def large_detail_error():
            raise HTTPException(status_code=500, detail=large_message)

        response = client.get("/large-detail-error")
        assert response.status_code == 500
        assert response.json() == {"message": large_message}