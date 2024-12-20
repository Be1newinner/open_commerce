import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.mark.describe("Tests for http_exception_handler")
class TestHttpExceptionHandler:

    @pytest.mark.happy_path
    def test_http_exception_handler_standard_response(self):
        """
        Test that the http_exception_handler returns a standardized JSON response
        with the correct status code and message for a typical HTTPException.
        """
        response = client.get("/nonexistent-endpoint")
        assert response.status_code == 404
        assert response.json() == {
            "message": "Not Found",
            "status_code": 404
        }

    @pytest.mark.edge_case
    def test_http_exception_handler_custom_status_code(self):
        """
        Test that the http_exception_handler correctly handles an HTTPException
        with a custom status code and message.
        """
        @app.get("/custom-error")
        async def custom_error():
            raise HTTPException(status_code=418, detail="I'm a teapot")

        response = client.get("/custom-error")
        assert response.status_code == 418
        assert response.json() == {
            "message": "I'm a teapot",
            "status_code": 418
        }

    @pytest.mark.edge_case
    def test_http_exception_handler_empty_detail(self):
        """
        Test that the http_exception_handler handles an HTTPException with an empty
        detail message gracefully.
        """
        @app.get("/empty-detail")
        async def empty_detail():
            raise HTTPException(status_code=400, detail="")

        response = client.get("/empty-detail")
        assert response.status_code == 400
        assert response.json() == {
            "message": "",
            "status_code": 400
        }

    @pytest.mark.edge_case
    def test_http_exception_handler_large_status_code(self):
        """
        Test that the http_exception_handler handles an HTTPException with a large
        status code gracefully.
        """
        @app.get("/large-status-code")
        async def large_status_code():
            raise HTTPException(status_code=599, detail="Custom Error")

        response = client.get("/large-status-code")
        assert response.status_code == 599
        assert response.json() == {
            "message": "Custom Error",
            "status_code": 599
        }