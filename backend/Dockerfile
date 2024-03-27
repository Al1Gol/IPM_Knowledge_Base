FROM python:3.10.12

RUN pip install --upgrade pip

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY ./IPM_Wiki /app/backend/

RUN pip install -r /app/backend/requirements.txt
RUN pip install gunicorn

# Build psycopg2-binary from source -- add required required dependencies
#RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#        pip install --no-cache-dir -r requirements.txt && \
#        apk --purge del .build-deps
