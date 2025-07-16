import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

with open("models/job_db.json") as f:
    job_db = json.load(f)

def match_resume(resume_skills):
    resume_text = " ".join(resume_skills)
    job_scores = []

    for job in job_db:
        job_text = " ".join(job['skills_required'])
        tfidf = TfidfVectorizer().fit_transform([resume_text, job_text])
        score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        job_scores.append({**job, "match_score": round(score, 2)})

    return sorted(job_scores, key=lambda x: x["match_score"], reverse=True)
