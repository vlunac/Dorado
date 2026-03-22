"""Middleware that converts snake_case JSON responses to camelCase
and camelCase JSON request bodies to snake_case."""

import json
import re

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


def _to_camel(snake: str) -> str:
    parts = snake.split("_")
    return parts[0] + "".join(w.capitalize() for w in parts[1:])


def _to_snake(camel: str) -> str:
    return re.sub(r"(?<=[a-z0-9])([A-Z])", r"_\1", camel).lower()


def _convert_keys(obj, converter):
    if isinstance(obj, dict):
        return {converter(k): _convert_keys(v, converter) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_convert_keys(item, converter) for item in obj]
    return obj


class CamelCaseMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Convert incoming camelCase request body to snake_case
        if request.method in ("POST", "PUT", "PATCH"):
            content_type = request.headers.get("content-type", "")
            if "application/json" in content_type:
                body = await request.body()
                if body:
                    try:
                        data = json.loads(body)
                        converted = _convert_keys(data, _to_snake)
                        new_body = json.dumps(converted).encode("utf-8")

                        async def receive():
                            return {"type": "http.request", "body": new_body}

                        request._receive = receive
                    except (json.JSONDecodeError, UnicodeDecodeError):
                        pass

        response = await call_next(request)

        # Convert outgoing snake_case response to camelCase
        content_type = response.headers.get("content-type", "")
        if "application/json" in content_type:
            body_parts = []
            async for chunk in response.body_iterator:
                if isinstance(chunk, bytes):
                    body_parts.append(chunk)
                else:
                    body_parts.append(chunk.encode("utf-8"))
            body = b"".join(body_parts)

            try:
                data = json.loads(body)
                converted = _convert_keys(data, _to_camel)
                new_body = json.dumps(converted).encode("utf-8")
                return Response(
                    content=new_body,
                    status_code=response.status_code,
                    headers=dict(response.headers),
                    media_type="application/json",
                )
            except (json.JSONDecodeError, UnicodeDecodeError):
                pass

        return response
