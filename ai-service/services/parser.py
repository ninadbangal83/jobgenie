import fitz  # PyMuPDF
import docx
import spacy

nlp = spacy.load("en_core_web_sm")

def parse_text_from_pdf(content):
    text = ""
    doc = fitz.open(stream=content, filetype="pdf")
    for page in doc:
        text += page.get_text()
    return text

def parse_text_from_docx(content):
    from io import BytesIO
    doc = docx.Document(BytesIO(content))
    return "\n".join([para.text for para in doc.paragraphs])

def parse_resume(filename, content):
    if filename.endswith('.pdf'):
        text = parse_text_from_pdf(content)
    elif filename.endswith('.docx'):
        text = parse_text_from_docx(content)
    else:
        return {"error": "Unsupported file type"}

    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ in ["SKILL", "ORG", "PERSON", "GPE"]]
    return {
        "text": text[:1000],  # Sample
        "skills": list(set(skills))
    }
