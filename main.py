import uvicorn
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# for security 
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

security = HTTPBasic()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

def admin_auth(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = "j300"
    correct_password = "j300"
    
    if credentials.username != correct_username or credentials.password != correct_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="帳號或密碼錯誤",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.get("/secret-openapi.json", include_in_schema=False)
def get_open_api_endpoint(username: str = Depends(admin_auth)):
    from fastapi.openapi.utils import get_openapi
    return get_openapi(title=app.title, version=app.version, routes=app.routes)


@app.get("/docs", include_in_schema=False)
async def get_documentation(username: str = Depends(admin_auth)):
    return get_swagger_ui_html(
        openapi_url="/secret-openapi.json",
        title=app.title + " - Swagger UI"
    )

# --- 一般公開網頁 ---
@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    user_data = {
        "title": "My FastAPI Web App",
        "username": "Shih-Chun",
        "items": ["Robot Control Panel", "Data Generator", "Simulation Dashboard"]
    }
    return templates.TemplateResponse(request=request, name="index.html", context=user_data)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)