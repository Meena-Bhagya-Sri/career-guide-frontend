import "../styles/Layout.css";

/* =========================
   RESOURCES DATA (from DB)
========================= */

const resources = [
  { id: 1, roadmap_id: 1, title: "Python for ML", type: "video", link: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
  { id: 2, roadmap_id: 2, title: "Machine Learning by Andrew Ng", type: "course", link: "https://www.coursera.org/learn/machine-learning" },
  { id: 3, roadmap_id: 4, title: "SQL for Data Analysis", type: "course", link: "https://www.khanacademy.org/computing/computer-programming/sql" },
  { id: 4, roadmap_id: 5, title: "Pandas Tutorial", type: "video", link: "https://www.youtube.com/watch?v=vmEHCJofslg" },
  { id: 5, roadmap_id: 7, title: "Java OOP Concepts", type: "video", link: "https://www.youtube.com/watch?v=6T_HgnjoYwM" },
  { id: 6, roadmap_id: 9, title: "REST API Design", type: "article", link: "https://restfulapi.net/" },
  { id: 7, roadmap_id: 11, title: "AWS Cloud Practitioner", type: "course", link: "https://aws.amazon.com/training/" },
  { id: 8, roadmap_id: 12, title: "Docker Basics", type: "video", link: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
  { id: 9, roadmap_id: 19, title: "Linear Algebra for ML", type: "video", link: "https://www.youtube.com/watch?v=kH7Z7p4LxHA" },
  { id: 10, roadmap_id: 19, title: "Probability for AI", type: "course", link: "https://www.khanacademy.org/math/statistics-probability" },
  { id: 11, roadmap_id: 20, title: "Deep Learning Specialization", type: "course", link: "https://www.coursera.org/specializations/deep-learning" },
  { id: 12, roadmap_id: 20, title: "Neural Networks Explained", type: "video", link: "https://www.youtube.com/watch?v=aircAruvnKk" },
  { id: 13, roadmap_id: 21, title: "How to Read Research Papers", type: "article", link: "https://www.microsoft.com/en-us/research/academic-program/how-to-read-a-paper/" },
  { id: 14, roadmap_id: 21, title: "ArXiv AI Papers", type: "website", link: "https://arxiv.org/list/cs.AI/recent" },
  { id: 15, roadmap_id: 16, title: "Networking Fundamentals", type: "video", link: "https://www.youtube.com/watch?v=qiQR5rTSshw" },
  { id: 16, roadmap_id: 16, title: "Linux for Beginners", type: "course", link: "https://www.udemy.com/course/linux-for-beginners/" },
  { id: 17, roadmap_id: 17, title: "Ethical Hacking Full Course", type: "video", link: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" },
  { id: 18, roadmap_id: 17, title: "Kali Linux Tools", type: "article", link: "https://www.kali.org/tools/" },
  { id: 19, roadmap_id: 18, title: "SOC Analyst Training", type: "course", link: "https://www.cybrary.it/course/soc-analyst-level-1/" },
  { id: 20, roadmap_id: 18, title: "SIEM Explained", type: "video", link: "https://www.youtube.com/watch?v=Y8zFv4dXv3E" },
  { id: 21, roadmap_id: 13, title: "Linux Command Line Basics", type: "video", link: "https://www.youtube.com/watch?v=ZtqBQ68cfJc" },
  { id: 22, roadmap_id: 13, title: "Networking for DevOps", type: "article", link: "https://www.redhat.com/en/topics/networking" },
  { id: 23, roadmap_id: 14, title: "Docker Crash Course", type: "video", link: "https://www.youtube.com/watch?v=pg19Z8LL06w" },
  { id: 24, roadmap_id: 14, title: "Jenkins CI/CD Tutorial", type: "video", link: "https://www.youtube.com/watch?v=7KCS70sCoK0" },
  { id: 25, roadmap_id: 15, title: "Kubernetes Explained", type: "video", link: "https://www.youtube.com/watch?v=X48VuDVv0do" },
  { id: 27, roadmap_id: 22, title: "Java Programming Basics", type: "video", link: "https://www.youtube.com/watch?v=eIrMbAQSU34" },
  { id: 29, roadmap_id: 23, title: "DSA Full Course", type: "video", link: "https://www.youtube.com/watch?v=RBSGKlAvoiM" },
  { id: 30, roadmap_id: 24, title: "Spring Boot Tutorial", type: "video", link: "https://www.youtube.com/watch?v=vtPkZShrvXQ" },
  { id: 32, roadmap_id: 26, title: "Pandas Data Analysis", type: "video", link: "https://www.youtube.com/watch?v=vmEHCJofslg" },
  { id: 33, roadmap_id: 26, title: "Data Visualization with Matplotlib", type: "video", link: "https://www.youtube.com/watch?v=DAQNHzOcO5A" },
  { id: 35, roadmap_id: 28, title: "HTML & CSS Full Course", type: "video", link: "https://www.youtube.com/watch?v=mU6anWqZJcc" },
  { id: 36, roadmap_id: 28, title: "JavaScript Tutorial", type: "video", link: "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
  { id: 37, roadmap_id: 29, title: "React Beginner Course", type: "video", link: "https://www.youtube.com/watch?v=bMknfKXIFA8" },
  { id: 38, roadmap_id: 30, title: "Node.js & Express", type: "video", link: "https://www.youtube.com/watch?v=Oe421EPjeBE" },
];

/* =========================
   COMPONENT
========================= */

export default function Resources() {
  return (
    <div className="content">
      <h2>Learning Resources</h2>
      <p className="text-secondary mb-4">
        Curated videos, courses, articles, and websites for each roadmap
      </p>

      <div className="row">
        {resources.map((res) => (
          <div key={res.id} className="career-card">
            <h4>{res.title}</h4>

            <p className="text-secondary">
              Type: <b>{res.type.toUpperCase()}</b>
            </p>

            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="career-link"
            >
              Open Resource →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}