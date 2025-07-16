from fastapi import FastAPI, File, UploadFile
from services.parser import parse_resume
from services.matcher import match_resume
import uvicorn

app = FastAPI()

@app.post("/parse")
async def parse(file: UploadFile = File(...)):
    content = await file.read()
    parsed = parse_resume(file.filename, content)
    matched_jobs = match_resume(parsed["skills"])
    return {
        "parsed_data": parsed,
        "matches": matched_jobs
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
