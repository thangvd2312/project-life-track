FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl && \
    rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --no-cache-dir poetry==1.8.3

WORKDIR /app

# Install dependencies first (better layer caching)
COPY pyproject.toml /app/
COPY .pre-commit-config.yaml /app/
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Copy source code
COPY . /app

EXPOSE 8000

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]