# 1. --- Builder Stage ---
# Use an official Python runtime as a parent image
FROM python:3.12-slim AS builder

# Set the working directory
WORKDIR /app

# Install poetry
RUN pip install --no-cache-dir poetry==1.8.2

# This tells Poetry to create the virtual environment in the project's root
# which makes it easier to copy to the next stage
ENV POETRY_VIRTUALENVS_IN_PROJECT=true

# Copy only the files needed for dependency installation
COPY pyproject.toml poetry.lock ./

# Install dependencies. `poetry install` will correctly install your `backend`
# package from the `src` directory into the virtual environment.
RUN poetry install --only main --no-interaction --no-ansi

# Copy the rest of the application source code
COPY ./src ./src


# 2. --- Final Stage ---
# Use a lean, non-builder image for the final product
FROM python:3.12-slim

# Set the project root as the working directory
WORKDIR /app

# Copy the virtual environment from the builder stage
COPY --from=builder /app/.venv ./.venv

# Activate the virtual environment for all subsequent commands
ENV PATH="/app/.venv/bin:$PATH"

# Copy the application code. This is technically not needed for the app to run
# since `poetry install` already placed the package in the venv, but it's
# good practice to have the source available for reference or other tools.
COPY --from=builder /app/src ./src

# --- CHANGE IS HERE ---
# Add the 'src' directory to Python's path. This allows Python to find
# the 'backend' module when uvicorn tries to import 'backend.main'.
ENV PYTHONPATH="/app/src"

# Command to run the application using uvicorn
# We refer to the *package name* as defined in pyproject.toml, not the file path.
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]