"""
Промежуточное логирование. Перехватывает request на момент 'перед' и 'после' запроса и передает в объект логгера
"""
import json
import logging
import os
import socket
import time

from querystring_parser import parser

request_logger = logging.getLogger(__name__)


class RequestLogMiddleware:
    """Request Logging Middleware."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(__name__)
        start_time = time.time()
        log_data = {
            "remote_address": request.META["REMOTE_ADDR"],
            "server_hostname": socket.gethostname(),
            "request_method": request.method,
            "request_path": request.get_full_path(),
        }

        # Only logging "*/api/*" patterns
        if "/api/" in str(request.get_full_path()) and "form-data" in str(request.headers):
            req_body = parser.parse(request.POST.urlencode())
            log_data["request_body"] = req_body
        elif "/api/" in str(request.get_full_path()) and "application/json" in str(request.headers):
            req_body = parser.parse(request.POST.urlencode()) if request.body else {}
            log_data["request_body"] = req_body

        # request passes on to controller
        response = self.get_response(request)

        # add runtime to our log_data
        if response and "application/json" in str(request.headers):
            response_body = json.loads(response.content.decode("utf-8"))
            log_data["response_body"] = response_body
        log_data["run_time"] = time.time() - start_time

        request_logger.info(msg=log_data)

        return response

    # Логироание ошибок(блочит некоторые ошибки)
    def process_exception(self, request, exception):
        try:
            raise exception
        except Exception as e:
            request_logger.exception("Unhandled Exception: " + str(e))
        return exception
