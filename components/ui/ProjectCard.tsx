// ProjectCard.tsx
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  techStack,
  githubUrl,
  demoUrl
}: ProjectCardProps) {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Project Image */}
      <div className="relative group overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        
        {/* Hover overlay with buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            {demoUrl && (
              <a 
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <FaGithub size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <FaGithub size={16} />
            View Code
          </a>
          
          {demoUrl && (
            <a 
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaExternalLinkAlt size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}