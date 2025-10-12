// Example usage in your component
import ProjectCard from './ProjectCard';

function ProjectsGrid() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      imageUrl: "/images/ecommerce-demo.jpg",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      demoUrl: "https://my-ecommerce-demo.vercel.app"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      imageUrl: "/images/taskapp-demo.jpg",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/username/task-manager",
      demoUrl: "https://taskapp-demo.netlify.app"
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              techStack={project.techStack}
              githubUrl={project.githubUrl} // Corrected prop name
              demoUrl={project.demoUrl} // Corrected prop name
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsGrid;