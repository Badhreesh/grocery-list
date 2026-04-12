FROM python:3.10.9-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1 \
    POETRY_VIRTUALENVS_CREATE=false

RUN pip install poetry==1.8.3

WORKDIR /usr/src/app

# Copy only dependency files first for better Docker caching
COPY ./pyproject.toml /usr/src/app/backend/
COPY ./poetry.lock /usr/src/app/backend/

WORKDIR /usr/src/app/backend
RUN poetry install
# # ENV PATH="/root/.local/bin:$PATH"
COPY . .
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
