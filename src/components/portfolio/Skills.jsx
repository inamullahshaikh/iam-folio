import Reveal from "./Reveal";
const ROWS = [
  ["AI/ML", ["LLMs","RAG","YOLOv8","ANNs","NLP","Prompt Engineering"]],
  ["GenAI", ["OpenAI API","LangChain","Vector Search","Document Ingestion"]],
  ["Backend", ["FastAPI","Python","Celery","REST APIs","Async","Microservices"]],
  ["DevOps", ["AWS","Docker","Kubernetes","Terraform","Ansible","CI/CD"]],
  ["Frontend", ["React","HTML","CSS","JavaScript"]],
  ["Languages", ["Python","C++","Java","C#","MASM"]],
];
export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Skills</div>
          <div className="skills-list">
            {ROWS.map(([cat, tags]) => (
              <div className="skill-row" key={cat}>
                <div className="skill-cat">{cat}</div>
                <div className="skill-tags">{tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
