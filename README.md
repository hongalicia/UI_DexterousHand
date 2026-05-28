# UI_DexterousHand
# FastAPI Web Application

This is a web application built with FastAPI. It features a Jinja2 template-based frontend, a secured Swagger UI, and several RESTful API endpoints.

## Features

- **Frontend Integration:** Serves HTML pages using Jinja2 templates and static files.
- **Secured Documentation:** Swagger UI (`/docs`) is protected via HTTP Basic Authentication.
- **Project Management API:** Add and view projects stored in an in-memory database.
- **Data Processing API:** Calculate speeds and process inputs.
- **Image Processing:** Integration with an external `image_processor` module.

## Prerequisites

- Python 3.7+
- FastAPI
- Uvicorn
- Jinja2
- pydantic

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd /home/j300/fastapi
   ```
2. Install the required dependencies:
   ```bash
   pip install fastapi uvicorn jinja2 pydantic
   ```

*Note: Ensure you have the `image_processor.py` module in your project root, as it is required for the `/api/show-image` endpoint.*

## Usage

Start the development server:

```bash
python main.py
```

The application will run at `http://0.0.0.0:8000`.

## API Documentation & Security

The interactive API documentation is available at `/docs`. It is protected by HTTP Basic Authentication.

- **Username:** `j300`
- **Password:** `j300`

## Project Structure

- `main.py`: The core FastAPI application.
- `static/`: Directory for static assets (CSS, JS, images).
- `templates/`: Directory for Jinja2 HTML templates (e.g., `index.html`).
