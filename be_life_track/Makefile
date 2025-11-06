POETRY := poetry
PY := $(POETRY) run

.PHONY: run format lint pre-commit-install

run:
	$(PY) uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload

format:
	$(PY) isort .
	$(PY) black .
	$(PY) ruff --fix .

lint:
	$(PY) ruff .


pre-commit-install:
	$(POETRY) run pre-commit install